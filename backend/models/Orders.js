const mongoose = require("mongoose")

const OrdersSchema = new mongoose.Schema({
    order_id: {type:mongoose.Schema.Types.ObjectId, require:true},
    paymentStatus: {type: String, enum: ["Pending", "Completed", "Failed"], default:"Pending"}, 
    amount: {type: Number, default:0}
})

module.exports = new mongoose.Schema('Orders', OrdersSchema)