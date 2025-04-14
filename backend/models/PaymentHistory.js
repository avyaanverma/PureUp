const mongoose = require('mongoose');

const PaymentHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('PaymentHistory', PaymentHistorySchema);
