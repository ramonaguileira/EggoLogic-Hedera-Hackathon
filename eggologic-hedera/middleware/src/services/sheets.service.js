const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const config = require('../config/env');
const logger = require('../utils/logger');

const GOOGLE_ENABLED = config.google && config.google.spreadsheetId && config.google.serviceAccountEmail && config.google.privateKey;

let doc;

async function getDoc() {
  if (!GOOGLE_ENABLED) {
    logger.info("Google Sheets polling disabled in demo mode");
    return null;
  }
  if (doc) return doc;
  try {
    const auth = new JWT({
      email: config.google.serviceAccountEmail,
      key: config.google.privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    doc = new GoogleSpreadsheet(config.google.spreadsheetId, auth);
    await doc.loadInfo();
    logger.info(`Connected to Google Sheet: ${doc.title}`);
    return doc;
  } catch (err) {
    logger.error(`Google Sheets connection error: ${err.message}`);
    return null;
  }
}

async function getDeliveryRows() {
  const document = await getDoc();
  if (!document) return [];

  const sheet = document.sheetsByTitle['Entregas'] || document.sheetsByTitle['ENTREGAS'];
  if (!sheet) {
    logger.error('Sheet "Entregas" not found');
    return [];
  }
  const rows = await sheet.getRows();
  return rows.map(row => ({
    delivery_id: row.get('delivery_id'),
    supplier_id: row.get('proveedor_id') || row.get('supplier_id'),
    fecha: row.get('fecha'),
    tipo_residuo: row.get('tipo_residuo'),
    kg_brutos: parseFloat(row.get('kg_brutos')) || 0,
    pct_impropios: parseFloat(row.get('pct_impropios')) || 0,
    kg_netos: parseFloat(row.get('kg_netos')) || 0,
    destino: row.get('destino'),
    quality_grade: row.get('quality_grade'),
    factor_calidad: parseFloat(row.get('factor_calidad')) || 1.0,
    factor_alianza: parseFloat(row.get('factor_alianza')) || 1.0,
    puntos_generados: parseFloat(row.get('puntos_generados')) || 0,
    operador: row.get('operador'),
    _rowNumber: row.rowNumber,
  }));
}

async function getDeliveryRowCount() {
  const document = await getDoc();
  if (!document) return 0;

  const sheet = document.sheetsByTitle['Entregas'] || document.sheetsByTitle['ENTREGAS'];
  if (!sheet) return 0;
  const rows = await sheet.getRows();
  return rows.length;
}

async function getNewDeliveries(offset = 0) {
  const rows = await getDeliveryRows();
  return rows.slice(offset);
}

module.exports = {
  getDeliveryRows,
  getDeliveryRowCount,
  getNewDeliveries
};
