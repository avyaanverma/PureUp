// CheckoutButton.js
import { useContext } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";

const CheckoutButton = () => {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const checkoutHandler = async () => {
    const { data: order } = await axios.post("http://localhost:5000/create-order", {
      amount: total,
    });

    const options = {
      key: "YOUR_KEY_ID",
      amount: order.amount,
      currency: order.currency,
      name: "Electronics Shop",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful");
        clearCart();
      },
      prefill: {
        name: "Customer",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <button onClick={checkoutHandler} disabled={cart.length === 0}>
      Pay ₹{total}
    </button>
  );
};

export default CheckoutButton;
