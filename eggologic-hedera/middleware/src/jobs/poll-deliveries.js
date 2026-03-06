const { getNewDeliveries } = require('../services/sheets.service');
const { submitDelivery } = require('../services/guardian.service');
const { calculateEggocoins } = require('../services/points.service');
const { mintEggocoins, publishAuditLog } = require('../services/hedera.service');
const config = require('../config/env');
const logger = require('../utils/logger');

let lastProcessedCount = 0;

async function pollDeliveries() {
  if (process.env.DEMO_MODE === 'true') {
    logger.info('[DEMO_MODE] Salteando el polling a Google Sheets y Guardian.');
    return;
  }

  try {
    const newDeliveries = await getNewDeliveries(lastProcessedCount);
    if (!newDeliveries || newDeliveries.length === 0) return;
    logger.info(`Found ${newDeliveries.length} new deliveries`);

    for (const delivery of newDeliveries) {
      const points = calculateEggocoins(delivery);
      const enrichedDelivery = { ...delivery, ...points };
      await submitDelivery(enrichedDelivery);
      await mintEggocoins(points.eggocoins);
      await publishAuditLog(config.hedera.topics.deliveries, {
        event_type: 'DELIVERY_RECEIVED',
        delivery_id: delivery.delivery_id,
        supplier_id: delivery.supplier_id,
        kg_netos: points.kg_netos,
        eggocoins_minted: points.eggocoins,
      });
      lastProcessedCount++;
    }
  } catch (error) {
    logger.error(`Poll error: ${error.message}`);
  }
}

module.exports = { pollDeliveries };
