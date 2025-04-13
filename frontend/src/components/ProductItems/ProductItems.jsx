import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price, discount = 0 }) => {
  const { currency } = useContext(ShopContext);
  const discountedPrice = discount ? Math.round(price * (100 - discount) / 100) : price;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product/${id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={image[0]} 
            alt={name} 
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-gray-800 font-medium mb-2 line-clamp-2">{name}</h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">
              {currency}{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-gray-400 text-sm line-through">
                {currency}{price}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-500 text-xs ml-1">(24)</span>
          </div>
        </div>
      </Link>

      {/* Quick Add Button */}
      <button 
        className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => {
          e.preventDefault();
          // Add to cart logic here
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      </button>
    </div>
  );
};

export default ProductItems;