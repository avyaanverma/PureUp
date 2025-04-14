import React, { useContext, useEffect, useState } from "react";
import logoPureUp from "../../../assets/logomini.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import avatar from "../../../assets/cat.png"
import { quotes } from "./quotes"; // import the quotes
export const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState("");
  const dayOfWeek = new Date().toLocaleString("en-us", { weekday: "long" });

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // assuming your token contains user info
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    } else {
      setUser(null);
    }

    // Set the quote based on the current day
    setQuote(quotes[dayOfWeek] ? quotes[dayOfWeek][Math.floor(Math.random() * quotes[dayOfWeek].length)] : "Plant a tree, save the Earth!");
  }, [token, logout]);

  return (
    <div className="flex p-2 py-6 justify-between items-center bg-[#2C3930] border-b border-gray-600 flex-wrap">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logoPureUp} alt="PureUp Logo" className="w-10 h-10" />
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

      {/* Random Quote */}
      <div className="text-white text-lg font-bold italic ml-4 hidden md:inline-flex">
        {quote}
      </div>

      {/* Button Group */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <a href="/store">
          <button className="border border-gray-400 text-white px-4 py-2 rounded-md bg-green-500 hover:bg-blue-600">
            Store
          </button>
        </a>

        {!token ? (
          <Link to="/login">
            <button className="border border-gray-400 text-gray-300 px-4 py-2 rounded-md hover:text-white hover:bg-[#38493f]">
              Log In
            </button>
          </Link>
        ) : (
          <>
            <div className="flex items-center space-x-2 text-white">
            <Link to="/user" className="flex items-center space-x-2 text-white">
              <img src={avatar} alt="avatar" className="w-10 h-10" />  
              <span className="text-base font-semibold  hidden md:inline">{user?.name || "User"}</span>
            </Link>
            </div>
            <button
              onClick={logout}
              className="border border-red-400 text-red-300 px-4 py-2 rounded-md hover:text-white hover:bg-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

