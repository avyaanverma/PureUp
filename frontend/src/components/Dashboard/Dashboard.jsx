import React, { useState } from "react";
import { Navbar } from "../pages/Navbar/Navbar";
import { Footer } from "../pages/Footer/Footer";
import { Aqistatus } from "../pages/Aqi/Aqistatus";
import { Aircompose } from "../pages/Aircompose/Aircompose";
import { Plant } from "../pages/PlantOfTheDay/Plant";
import { Sidebar } from "../pages/Sidebar/Sidebar";
import { NearbyNurseries } from "../pages/NearbyNurseries/NearbyNurseries";
import { PlantWiki } from "../pages/PlantWiki/PlantWiki";
import { BuySoil } from "../pages/BuySoil/BuySoil";
import { Checker } from "../pages/SoilCheck/Checker";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex-shrink-0 flex justify-between items-center p-4 bg-gray-800">
        <Navbar />
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          Menu
        </button>
      </header>

      <main className="flex-grow flex">
        {/* {isSidebarOpen && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )} */}
        <div className="container mx-auto p-6 flex flex-col items-center w-full">
          {/* Nearby Nurseries, AQI Status, and Air Composition */}
          <section className="mb-6 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start">
            {/* Nearby Nurseries */}
            <div className="col-span-1">
              <NearbyNurseries />
            </div>

            {/* AQI Status and Air Composition */}
            <div className="col-span-2 flex flex-col">
              <div className="mb-4 mt-16">
                <Aqistatus />
              </div>
              <div className="self-end w-full max-w-sm">
                <Aircompose />
              </div>
            </div>
          </section>

          {/* PlantWiki and Plant of the Day */}
          <section className="mb-6 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1 md:flex-none">
              <PlantWiki />
            </div>
            <div className="flex-1 md:flex-none ml-auto">
              <Plant />
            </div>
          </section>

          {/* Buy Soil and Soil Checker */}
          <section className="mb-6 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1 md:flex-none">
              <BuySoil />
            </div>
            <div className="flex-1 md:flex-none ml-auto">
              <Checker />
            </div>
          </section>
        </div>
      </main>

      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
