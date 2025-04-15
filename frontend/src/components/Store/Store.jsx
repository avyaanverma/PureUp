import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "../../components/Store/CartSidebar"; // Import the CartSidebar component
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title/Title.jsx";
import ProductItems from "../../components/ProductItems/ProductItems.jsx";
import { Navbar } from "../../components/pages/Navbar/Navbar.jsx";
import { Footer } from "../../components/pages/Footer/Footer.jsx";

const Store = () => {
  const { products } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext);
  const [cartVisible, setCartVisible] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product); 
  };

  // Toggle cart sidebar visibility
  const toggleCartSidebar = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://www.petalrepublic.com/wp-content/uploads/2020/11/Rooted-Online-Plant-Delivery-in-the-USA-1536x1025.jpg"
          alt="Plant Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-light mb-4">Plant Paradise</h1>
            <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
              Discover our collection of beautiful plants for your home
            </p>
            <button
              onClick={toggleCartSidebar}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* This Week's Fresh Arrivals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <Title text1={"This Week's"} text2={"Fresh Arrivals"} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductItems
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                discount={20}
                className="border-2 border-green-100"
                onAddToCart={() => handleAddToCart(item)} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartVisible} closeSidebar={toggleCartSidebar} />
    </div>
  );
};

export default Store;
