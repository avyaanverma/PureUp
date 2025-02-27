import React, { useContext, useEffect } from "react";
import PlantOfTheDay from "../components/PlantOfTheDay";
import PlantList from "../components/PlantList";
import { ShopContext } from "../context/ShopContext";
import { getAllPlants } from "../services/api";
import PlantDetails from "../components/PlantDetails";
import FarmerSection from "../components/FarmerSection";
import ProductList from "../components/ProductList";


const Home = () => {
    
    return (
        <div>
            {/* Hero Section */}
            <section className="heroSection flex flex-col md:flex-row  text-white  md:p-10 bg-[#212121] p-8 px-28 justify-center items-center">
                <div className="left md:p-10 md:text-left p-8 space-y-4">
                    <h1 className="thought text-6xl max-w-3xl font-poppins">Make a Beautiful Garden With Your Own Hand</h1>
                    <p className="text-sm max-w-md">Find your Dream plant for your home decoration and purification and we will make it happen.</p>
                    
                    <button type="button" className="text-white-900 bg-[#212121] border border-gray-300 focus:outline-none hover:bg-green-100 hover:text-gray-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 ">Explore Now</button>

                </div>
                {/* Plant of the day and Thought of the day  */}
                <div className="plantOfTheDay">
                    <img width={400} height={400} src="https://cdn.shopify.com/s/files/1/0624/7972/8867/files/Snake-plant-growing-guide.jpg" alt="Plantimage" />
                </div>
            </section>
            {/* Plants for Sale */}
            <section className="plants-for-sale flex flex-col md:flex-row  text-white  md:p-10 bg-[#212121] p-8 px-28 justify-center items-center">
                <PlantDetails/>
            </section>

            <section>
                <FarmerSection/>
            </section>

            <section>
            <section className="plants-for-sale text-white bg-[#212121] p-8 px-28">
                <ProductList />
            </section>
            </section>
        </div>
    );
};

export default Home;
