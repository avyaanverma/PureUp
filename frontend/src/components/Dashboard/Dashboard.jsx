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
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            className="hidden md:block"
          />
        )}

        <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center w-full">
          {/* Nearby Nurseries, AQI Status, and Air Composition */}
          <section className="mb-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <NearbyNurseries />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <Aqistatus />
              <Aircompose />
            </div>
          </section>

          {/* PlantWiki and Plant of the Day */}
          <section className="mb-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlantWiki />
            <Plant />
          </section>

          {/* Buy Soil and Soil Checker */}
          <section className="mb-6 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <BuySoil />
            <Checker />
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
