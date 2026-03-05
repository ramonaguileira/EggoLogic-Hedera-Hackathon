const express = require('express');
const router = express.Router();
const { pollDeliveries } = require('../jobs/poll-deliveries');

router.post('/form-submit', async (req, res) => {
  await pollDeliveries();
  res.json({ status: 'processed' });
});

module.exports = router;
