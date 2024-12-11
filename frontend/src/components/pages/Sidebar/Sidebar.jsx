import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Link } from "react-router-dom"; // Ensure this is needed for your sidebar

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-32`}
    >
      <div className="p-4">
        <button
          onClick={toggleSidebar}
          className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
      <ul className="flex flex-col items-start space-y-4 p-4">
        <li>
          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-2 py-1 rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:bg-gray-700 px-2 py-1 rounded"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/store"
            className="text-white hover:bg-gray-700 px-2 py-1 rounded"
          >
            Store
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="text-white hover:bg-gray-700 px-2 py-1 rounded"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Prop type validation
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export { Sidebar };// Named export
 