const express = require('express');
const router = express.Router();
router.get('/stats', (req, res) => res.json({
  total_deliveries: 0, total_eggocoins_minted: 0,
  total_carboncoin_issued: 0, carbon_accumulator_kg: 0, carbon_threshold_kg: 1000,
}));
router.get('/deliveries/recent', (req, res) => res.json({ deliveries: [] }));
module.exports = router;
