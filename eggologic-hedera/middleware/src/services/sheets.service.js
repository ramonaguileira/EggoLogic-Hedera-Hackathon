import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

let doc;

async function getDoc() {
  if (doc) return doc;
  const auth = new JWT({
    email: config.google.serviceAccountEmail,
    key: config.google.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  doc = new GoogleSpreadsheet(config.google.spreadsheetId, auth);
  await doc.loadInfo();
  logger.info(`Connected to Google Sheet: ${doc.title}`);
  return doc;
}

export async function getDeliveryRows() {
  const document = await getDoc();
  const sheet = document.sheetsByTitle['Entregas'] || document.sheetsByTitle['ENTREGAS'];
  if (!sheet) throw new Error('Sheet "Entregas" not found');
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

export async function getDeliveryRowCount() {
  const document = await getDoc();
  const sheet = document.sheetsByTitle['Entregas'] || document.sheetsByTitle['ENTREGAS'];
  const rows = await sheet.getRows();
  return rows.length;
}
