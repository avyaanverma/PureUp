import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay to close sidebar when clicked outside */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 sm:w-72 md:w-80 z-50 shadow-lg`}
        style={{ zIndex: 1000 }} // Keeps sidebar above Navbar
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
        <ul className="flex flex-col items-start space-y-4 p-4">
          {["Home", "About", "Store", "Contact"].map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-white block px-4 py-2 rounded hover:bg-gray-700 w-full"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export { Sidebar };
