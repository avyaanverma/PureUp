import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
            {products.map((product) => (
                <div key={product._id} className="flex justify-center bg-white rounded-lg shadow-lg m-4 w-64">
                    <div className="img w-36 h-36 flex items-center justify-center">
                        <img src={product.image} className="object-cover w-full h-full rounded-md" alt={product.name} />
                    </div>
                    <div className="flex-col p-4 space-y-4">
                        <h2 className="font-poppins font-semibold text-gray-700">{product.name}</h2>
                        <p className="text-xs font-light text-gray-800">{product.description}</p>
                        <p className="text-xs font-medium text-green-600">₹{product.price}</p>
                        <button
                            type="button"
                            className="text-gray-900 hover:text-white hover:bg-[#212121] border border-gray-300 focus:outline-none bg-green-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-xs w-20 h-8"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
