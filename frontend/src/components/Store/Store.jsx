import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title/Title.jsx"; // Correct import
import ProductItems from "../../components/ProductItems/ProductItems.jsx";
import {Navbar} from "../../components/pages/Navbar/Navbar.jsx";
import {Footer} from "../../components/pages/Footer/Footer.jsx"


const Store = () => {
  const { products } = useContext(ShopContext); // Correct import
  const [showFilter, setShowFilter] = useState(false); // Define state inside Store
  const [filterProducts, setFilterProducts] = useState([]); // Define state inside Store
  const [category, setCategory] = useState([]); // Define state inside Store
  const [subCategory, setSubCategory] = useState([]); // Define state inside Store
  const [sortType, setSortType] = useState("relavant"); // Define state inside Store

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div >
      <Navbar/>
      <div className="pt-20">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-10">
      {/* Left Sidebar (Filters) */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
        >
          FILTER
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Soil"}
                onChange={toggleCategory}
              />{" "}
              Soil
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Plant"}
                onChange={toggleCategory}
              />{" "}
              Plant
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Seeds"}
                onChange={toggleCategory}
              />{" "}
              Seeds
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Clay"
                onChange={toggleSubCategory}
              />{" "}
              Clay
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Sandy"
                onChange={toggleSubCategory}
              />{" "}
              Sandy
            </label>
            <label className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Loamy"
                onChange={toggleSubCategory}
              />{" "}
              Loamy
            </label>
          </div>
        </div>
      </div>

      {/* Right Section (Products) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
            name=""
            id=""
          >
            <option value="relavant">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
      </div>
    <Footer/>
    </div>
  );
};

export default Store;
