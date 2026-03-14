const { getDeliveryRows, updateDeliveryRow } = require('../services/sheets.service');
const { submitDelivery, getSuppliers } = require('../services/guardian.service');
const { calculateEggocoins } = require('../services/points.service');
const { validateDelivery } = require('../utils/validators');
const { transferEggocoins, publishAuditLog } = require('../services/hedera.service');
const config = require('../config/env');
const logger = require('../utils/logger');

async function pollDeliveries() {
  if (process.env.DEMO_MODE === 'true') return;

  try {
    logger.info('--- Polling Start ---');
    const allDeliveries = await getDeliveryRows();
    
    // Filter rows that haven't been synced yet
    const pending = allDeliveries.filter(d => {
      const kg = parseFloat(d.kg_brutos);
      return d.supplier_id && !isNaN(kg) && kg > 0 && (!d.hts_mint_tx || d.hts_mint_tx === '');
    });
    
    if (pending.length === 0) {
      logger.info('Polling: No new deliveries to process.');
      return;
    }
    
    logger.info(`Polling: Found ${pending.length} new deliveries.`);

    // PRE-FETCH Suppliers from Guardian to match for the 30% split
    let suppliersCount = 0;
    let guardianSuppliers = [];
    try {
        guardianSuppliers = await getSuppliers();
        suppliersCount = guardianSuppliers.length;
        logger.info(`Guardian: Found ${suppliersCount} suppliers in policy.`);
    } catch (sErr) {
        logger.warn(`Guardian: Could not fetch suppliers list for splitting.`);
    }

    for (const entrega of pending) {
      logger.info(`>>> Processing Row ${entrega._rowNumber} [Supplier: ${entrega.supplier_id}]`);

      // 0. ID generation
      if (!entrega.delivery_id) {
        entrega.delivery_id = `DLV_${entrega.supplier_id}_${Date.now()}`;
        await updateDeliveryRow(entrega._rowNumber, { delivery_id: entrega.delivery_id });
      }

      const { valid, errors } = validateDelivery(entrega);
      if (!valid) {
        logger.warn(`Skipping invalid Row ${entrega._rowNumber}: ${errors.join(', ')}`);
        continue;
      }

      const reward = calculateEggocoins(entrega);
      const totalPoints = reward.eggocoins;
      
      // 1. Guardian Submission (Automation triggers MINT on MGS)
      logger.info(`Submitting VC to Guardian...`);
      let guardianSyncStatus = 'FAILED';
      try {
        const guardianRes = await submitDelivery(entrega);
        if (guardianRes.status === 'SUCCESS') {
          logger.info(`✅ Guardian: VC published. Minting triggered on-chain.`);
          guardianSyncStatus = 'GUARDIAN_SYNC';
        } else {
          logger.error(`❌ Guardian: Reject: ${guardianRes.message}`);
        }
      } catch (gErr) {
        logger.error(`Guardian Error: ${gErr.message}`);
      }

      if (guardianSyncStatus !== 'GUARDIAN_SYNC') continue;

      // 2. 30% Transfer to Supplier (secondary operation)
      let shareInfo = { amount: 0, wallet: 'None', txId: 'N/A' };
      try {
        const supplier = guardianSuppliers.find(s => 
          String(s.nombre).toLowerCase().includes(String(entrega.supplier_id).toLowerCase())
        );

        if (supplier && supplier.wallet && supplier.wallet.startsWith('0.0.')) {
          const supplierShare = Math.round(totalPoints * 0.30 * 100) / 100;
          
          // Wait 5 seconds for Guardian's automated minting to reflect in balance
          logger.info(`Waiting for mint finality before 30% transfer...`);
          await new Promise(r => setTimeout(r, 5000));
          
          logger.info(`HTS: Transferring ${supplierShare} EGGO to supplier ${supplier.wallet}...`);
          const transferRes = await transferEggocoins(supplier.wallet, supplierShare);
          shareInfo = { amount: supplierShare, wallet: supplier.wallet, txId: transferRes.txId };
        } else {
          logger.warn(`HTS Split: No registered wallet found for supplier ID: ${entrega.supplier_id}`);
        }
      } catch (tErr) {
        logger.error(`HTS Transfer Error: ${tErr.message}`);
      }

      // 3. Audit Log (HCS)
      let hcsTxId = 'N/A';
      try {
        const hcsRes = await publishAuditLog(config.hedera.topics.deliveries, {
          event_type: 'DELIVERY_PROCESSED',
          delivery_id: entrega.delivery_id,
          supplier_id: entrega.supplier_id,
          kg_brutos: entrega.kg_brutos,
          eggocoins_total: totalPoints,
          supplier_share: shareInfo.amount,
          supplier_wallet: shareInfo.wallet,
          transfer_tx: shareInfo.txId
        });
        hcsTxId = hcsRes.txId;
      } catch (hErr) {
          logger.error(`HCS Error: ${hErr.message}`);
      }

      // 4. Update Sheet with completion markers
      await updateDeliveryRow(entrega._rowNumber, {
        hts_mint_tx: 'GUARDIAN_SYNC',
        hcs_tx: hcsTxId,
        kg_netos: reward.kg_netos,
        Eggocoin: totalPoints
      });
      
      logger.info(`✅ Row ${entrega._rowNumber} fully processed.`);
    }
    logger.info('--- Polling End ---');
  } catch (err) {
    logger.error(`Poll loop error: ${err.message}`);
  }
}

module.exports = { pollDeliveries };
