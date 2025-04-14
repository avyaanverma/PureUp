// routes/payment.js
const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const User = require('../models/User');

router.get('/payment-history', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.paymentHistory);
});

module.exports = router;
