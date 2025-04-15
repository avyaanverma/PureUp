// ProductCard.js
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};
