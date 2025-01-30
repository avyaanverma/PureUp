import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { Sidebar } from "../Sidebar/Sidebar";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-white border-b border-green-800 fixed w-full z-50 top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Sidebar Toggle Button (Always Visible) */}
          <button
            onClick={toggleSidebar}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <img src={logo} className="h-10 sm:h-12" alt="Logo" />
          </a>

          {/* Other Navbar Items */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border border-gray-300 rounded-md hidden md:block focus:ring-green-300"
            />

            <button className="relative flex items-center justify-center p-2 rounded-lg hover:bg-green-100 focus:ring-2 focus:ring-green-300">
              <svg
                className="w-6 h-6 text-green-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 15c0 1.104-.896 2-2 2H8c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h8c1.104 0 2 .896 2 2v11zM12 19c1.104 0 2 .896 2 2H10c0-1.104.896-2 2-2z"></path>
              </svg>
            </button>

            <button className="bg-green-800 text-white px-4 py-2 rounded-lg">Login</button>
          </div>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
