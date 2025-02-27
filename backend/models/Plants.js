const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isPlantOfTheDay: { type: Boolean, default: false }
}, {collection: 'Plants'});

module.exports = mongoose.model('Plant', plantSchema);
