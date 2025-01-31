import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.png";
import { Sidebar } from "../Sidebar/Sidebar";

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Toggle Dark Mode for Entire Page
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  // Apply Theme on Page Load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-green-800 fixed w-full z-50 top-0 transition-colors">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Sidebar Toggle Button */}
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
              className="px-3 py-1 border border-gray-300 rounded-md hidden md:block focus:ring-green-300 dark:bg-gray-700 dark:text-white"
            />

            {/* Notification Icon */}
            <button className="relative flex items-center justify-center p-2 rounded-lg hover:bg-green-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-green-300">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 15c0 1.104-.896 2-2 2H8c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2h8c1.104 0 2 .896 2 2v11zM12 19c1.104 0 2 .896 2 2H10c0-1.104.896-2 2-2z"></path>
              </svg>
            </button>

            {/* Theme Toggle Button (Clear Sun 🌞 / Moon 🌙 Icons) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <span className="text-yellow-400 text-2xl">🌞</span> // Sun icon for light mode
              ) : (
                <span className="text-gray-800 dark:text-white text-2xl">🌙</span> // Moon icon for dark mode
              )}
            </button>

            {/* Login Button */}
            <button className="bg-green-800 text-white px-4 py-2 rounded-lg dark:bg-green-600">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;
