import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartSidebar = ({ isOpen, closeSidebar }) => {
  const { cart, getTotalPrice, removeFromCart } = useContext(CartContext);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
  
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  
    // Ideally ye backend se aayega
    const orderData = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }), // Amount in INR, multiply by 100 for paise
    });
  
    const data = await orderData.json();
  
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with real one
      amount: data.amount,
      currency: "INR",
      name: "Plant Paradise",
      description: "Thank you for shopping with us",
      image: "https://plant-logo.example.com",
      order_id: data.id,
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#4CAF50",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span className="ml-4 text-lg font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">${item.price}</span>
                    <span className="ml-2 text-sm text-gray-600">x{item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="text-xl font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <Link to="/checkout">
                <button
                    onClick={handlePayment}
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                    Buy Now
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
      <button
        onClick={closeSidebar}
        className="absolute top-4 left-4 text-2xl text-gray-700"
      >
        ×
      </button>
    </div>
  );
};

export default CartSidebar;
