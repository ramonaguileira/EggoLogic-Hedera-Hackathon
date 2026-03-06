const express = require('express');
const router = express.Router();
const { DEMO_DELIVERIES } = require('../data/demo-data');

router.get('/stats', (req, res) => {
  const total_deliveries = DEMO_DELIVERIES.length;
  const kg_net_total = DEMO_DELIVERIES.reduce((sum, d) => sum + d.kg_netos, 0);
  const eggocoins_total = DEMO_DELIVERIES.reduce((sum, d) => sum + d.coins, 0);
  const co2e_avoided_total = Math.round(kg_net_total * 0.70 * 100) / 100;
  const carbon_progress = kg_net_total; // or a specific value if you want to show progress towards threshold

  res.json({
    total_deliveries,
    kg_net_total: Math.round(kg_net_total * 100) / 100,
    eggocoins_total: Math.round(eggocoins_total * 100) / 100,
    co2e_avoided_total,
    carbon_progress: Math.round(carbon_progress * 100) / 100,
    carbon_threshold: 1000,
    carboncoin_minted: kg_net_total >= 1000
  });
});

router.get('/deliveries/recent', (req, res) => {
  res.json({ deliveries: DEMO_DELIVERIES });
});

module.exports = router;
