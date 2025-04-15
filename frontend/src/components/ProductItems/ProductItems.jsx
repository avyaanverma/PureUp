import React from "react";

const ProductItems = ({ id, image, name, price, discount, onAddToCart }) => {
  return (
    <div className="relative border-2 border-green-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 line-through">${(price * (1 + discount / 100)).toFixed(2)}</span>
          <span className="text-lg font-semibold text-gray-900">${price.toFixed(2)}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItems;
