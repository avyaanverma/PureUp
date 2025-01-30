import { createContext ,useState } from "react";
import { products } from "../../src/assets/assets";

export const ShopContext = createContext({
  products: [],
  currency: "$",
  delivery_fee: 0,
}); // ✅ Default values

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
