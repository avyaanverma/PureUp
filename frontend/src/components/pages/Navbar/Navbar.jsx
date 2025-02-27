import React, { useState } from "react";
import logo from "../../../assets/logo.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-green-800 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-12" alt="Flowbite Logo" />
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-green-800 hover:bg-green-800 hover:text-black focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Login
            </button>
            {/* Profile Button next to the Login button */}
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300">
              <img
                src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" // Replace with your profile image URL
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-green-800">Profile</span>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {/* Bell Icon */}
              {/* <button className="relative flex items-center justify-center p-2 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300">
                <svg
                  className="w-6 h-6 text-green-800"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15c0 1.104-.896 2-2 2H8c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h8c1.104 0 2 .896 2 2v11zM12 19c1.104 0 2 .896 2 2H10c0-1.104.896-2 2-2z"></path>
                </svg>
                {/* Notification Badge (Optional) */}
              {/* <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full"></span> */}
              {/* </button> */}

              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300">
                <a href="/store">
                  <img
                    src="https://img.icons8.com/?size=100&id=13010&format=png&color=000000" // Replace with your profile image URL
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </a>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
