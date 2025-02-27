const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    story: { type: String, required: true }
}, {collection: "Farmer"});

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;
