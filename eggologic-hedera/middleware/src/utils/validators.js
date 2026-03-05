function validateDelivery(data) {
  const errors = [];
  if (!data.delivery_id) errors.push('delivery_id required');
  if (!data.supplier_id) errors.push('supplier_id required');
  if (!data.kg_brutos || data.kg_brutos <= 0) errors.push('kg_brutos must be > 0');
  if (data.kg_brutos > 200) errors.push('kg_brutos must be <= 200');
  if (data.pct_impropios < 0 || data.pct_impropios > 100) errors.push('pct_impropios must be 0-100');
  return { valid: errors.length === 0, errors };
}

module.exports = { validateDelivery };
