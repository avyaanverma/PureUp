import React, { useState } from "react";
import { Navbar } from "../pages/Navbar/Navbar";
import { Footer } from "../pages/Footer/Footer";
import { Aqistatus } from "../pages/Aqi/Aqistatus";
import { Aircompose } from "../pages/Aircompose/Aircompose";
import { Plant } from "../pages/PlantOfTheDay/Plant";
import { NearbyNurseries } from "../pages/NearbyNurseries/NearbyNurseries";
import { PlantWiki } from "../pages/PlantWiki/PlantWiki";
import { BuySoil } from "../pages/BuySoil/BuySoil";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header - Removed sidebar toggle button */}
      <header className="sticky top-0 z-10 flex-shrink-0 p-4 bg-gray-800 shadow-md">
        <Navbar />
      </header>

      {/* Main Content - Removed sidebar references */}
      <main className="flex-grow">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Top Row */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Nearby Nurseries - Takes half width */}
            <div className="lg:w-1/2">
              <NearbyNurseries />
            </div>
            
            {/* Air Quality Cards */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-4 aspect-square">
                <Aqistatus />
              </div>
              <div className="bg-white rounded-lg shadow p-4 aspect-square">
                <Aircompose />
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <PlantWiki />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <Plant />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bg-white rounded-lg shadow p-4">
            <BuySoil />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;