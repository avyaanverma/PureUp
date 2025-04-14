// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  paymentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentHistory',
      required:true
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
