import React from "react";
import { Navbar } from "../pages/Navbar/Navbar";
import { Footer } from "../pages/Footer/Footer";
import { Aqistatus } from "../pages/Aqi/Aqistatus";
import { Aircompose } from "../pages/Aircompose/Aircompose";
import { Plant } from "../pages/PlantOfTheDay/Plant";
import {Slider} from "../pages/Slider/Slider"
// import {Header} from "../pages/Header/Header"
import {Checker} from "../pages/SoilCheck/Checker"

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      
      {/* <Header/> */}
      {/* Main content */}
      <main className="flex-grow bg-gray-00">
        <div className="container mx-auto p-6 ">

          {/* AQI Status Section */}
          <section className="m-20">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Real-time Air Quality Dashboard
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
              {" "}
              {/* Centered and wider div */}
              <Aqistatus />
            </div>
          </section>

          {/* Add more sections here */}
          <section className="mb-8 w-full max-w-[1200px] h-[600px] mx-auto">
            <div className=" rounded-lg p-6 flex justify-between items-center w-full space-x-3">
              {/* Left-aligned Aircompose */}
              <div >
                <Aircompose />
              </div>
              {/* Right-aligned Plant */}
              <div >
                <Plant />
              </div>
            </div>
          </section>

          <Checker/>
          <Slider/>

        </div>
      </main>

      {/* Footer at the bottom */}
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
