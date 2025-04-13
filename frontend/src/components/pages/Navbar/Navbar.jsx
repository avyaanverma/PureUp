import React from "react";
import logoPureUp from "../../../assets/logomini.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex p-2 py-6 justify-between items-center bg-[#2C3930] border-b border-gray-600 flex-wrap">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logoPureUp} alt="TailwindFlex Logo" className="w-10 h-10" />
        <h2 className="font-bold text-2xl text-white">PureUp</h2>
      </Link>

      {/* Search Bar */}
      <div className="relative flex items-center hidden md:inline-flex">
        <input
          type="text"
          placeholder="Search"
          className="w-80 border border-gray-500 rounded-md py-1 px-2 bg-[#2C3930] text-white placeholder-gray-300"
        />
        <svg
          className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Button Group */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <a href="/store">
          <button className="border border-gray-400 text-white px-2 py-1 rounded-md hover:bg-[#38493f]">
            Store
          </button>
        </a>
        <button className="border border-gray-400 text-gray-300 px-2 py-1 rounded-md hover:text-white hover:bg-[#38493f]">
          Log In
        </button>
        <button className="border px-2 py-1 rounded-md bg-green-100 text-[#2C3930] hover:bg-green-200">
          Profile
        </button>
      </div>
    </div>
  );
};
