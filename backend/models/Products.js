const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, // Array of image URLs
    category: { type: String, required: true },
    weight: { type: String, required: true },
    date: { type: Number, required: true }, // Timestamp (Unix format)
    bestseller: { type: Boolean, default: false }
  },
  { collection: "Product" } // Setting the collection name
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
