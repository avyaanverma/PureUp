import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title/Title.jsx";
import ProductItems from "../../components/ProductItems/ProductItems.jsx";
import { Navbar } from "../../components/pages/Navbar/Navbar.jsx";
import { Footer } from "../../components/pages/Footer/Footer.jsx";
import { Link } from "react-router-dom";

const Store = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [freshArrivals, setFreshArrivals] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Initialize fresh arrivals (last 8 added products)
  useEffect(() => {
    if (products.length > 0) {
      const sortedByDate = [...products].sort((a, b) => 
        new Date(b.addedDate) - new Date(a.addedDate)
      );
      setFreshArrivals(sortedByDate.slice(0, 8));
      setFilterProducts(products); // Initialize with all products
    }
  }, [products]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productCopy = [...products];

    if (category.length > 0) {
      productCopy = productCopy.filter(item => 
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => 
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        fpCopy.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      default: // relevant
        fpCopy.sort((a, b) => b.rating - a.rating);
    }

    setFilterProducts(fpCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

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
            <Link 
              to="/new-arrivals" 
              className="inline-block bg-white text-green-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Discount Strip */}
      <div className="bg-[#2C3930] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center bg-white rounded-full px-4 py-1 shadow-sm">
            <span className="font-bold text-green-700 mr-2">FRESH20</span>
            <span className="text-sm">20% OFF on new arrivals</span>
          </div>
          <div className="flex items-center bg-white rounded-full px-4 py-1 shadow-sm">
            <span className="font-bold text-green-700 mr-2">PLANT30</span>
            <span className="text-sm">30% OFF on first order</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* This Week's Fresh Arrivals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <Title text1={"This Week's"} text2={"Fresh Arrivals"} />
            <Link to="/new-arrivals" className="text-green-600 font-medium text-sm">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {freshArrivals.map((item) => (
              <ProductItems
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                discount={20}
                className="border-2 border-green-100"
              />
            ))}
          </div>
        </div>

        {/* Mobile filter dialog */}
        <div className="lg:hidden mb-6">
          <button
            type="button"
            className="flex items-center text-gray-700"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="mr-2">Filters</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:w-1/4 bg-white p-6 rounded-lg shadow-sm`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Filters</h2>
              {mobileFiltersOpen && (
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {['Plants', 'Soil', 'Seeds', 'Accessories'].map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      id={`category-${cat}`}
                      name="category"
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                      className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`category-${cat}`} className="ml-3 text-sm text-gray-600">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Type</h3>
              <div className="space-y-2">
                {['Indoor', 'Outdoor', 'Low Maintenance', 'Pet Friendly'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      id={`type-${type}`}
                      name="type"
                      type="checkbox"
                      value={type}
                      checked={subCategory.includes(type)}
                      onChange={toggleSubCategory}
                      className="h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`type-${type}`} className="ml-3 text-sm text-gray-600">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <Title text1={"Our"} text2={"Collection"} />
              <div className="mt-4 md:mt-0">
                <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  id="sort"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm text-sm py-2 pl-3 pr-10 border focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProducts.map((item) => (
                <ProductItems
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  discount={item.discount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Store;