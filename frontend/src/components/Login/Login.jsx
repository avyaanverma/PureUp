import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Assuming AuthContext provides login function
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure you have run `npm i axios` or `yarn add axios`
import logoPureUp from "../../assets/logomini.png";
import {motion, AnimatePresence} from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  // State to track if we are in register mode or login mode
  const [isRegistering, setIsRegistering] = useState(false);

  // Form fields state
  const [name, setName] = useState(""); // Only used for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only used for registration
  const isValidName = name.trim().length >= 3;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;
  const isPasswordMatch = password === confirmPassword;

  const allFilled = isRegistering
  ? isValidName && isValidEmail && isValidPassword && isPasswordMatch
  : isValidEmail && isValidPassword;


  // State for handling loading and errors (optional but good practice)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get login function from context and navigate function
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // API base URL (consider moving this to an environment variable)
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // e.g., http://localhost:8000
  const API_URL = `${BASE_URL}/api/user`;
  console.log(import.meta.env);
  
  console.log(import.meta.env.VITE_BACKEND_URL)
  const floatUp = {
    initial: { y: 20, opacity: 0, scale:0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale:1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      y: -10,
      opacity: 0,
      scale:0.95,
      transition: { duration: 0.1 },
    },
  };
  const floatDown = {
    initial: { y: -20, opacity: 0, scale:0.95 },
    animate: {
      y: 0,
      opacity: 1,
      scale:1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      scale:0.95,
      transition: { duration: 0.1 },
    },
  };
  
  // Function to clear form fields
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(""); // Clear any previous errors
  };

  // Toggle between Login and Register modes
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    clearForm(); // Clear fields when switching modes
  };

  // Handle form submission for both Login and Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors on new submission

    if (isRegistering) {
      // --- Registration Logic ---
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return; // Stop submission
      }
      try {
        // Make API call to register endpoint
        await axios.post(`${API_URL}/register`, {
          name,
          email,
          password,
        });
        // Optionally automatically log in or just show success and switch to login
        alert("Registration successful! Please log in.");
        setIsRegistering(false); // Switch to login mode after successful registration
        clearForm(); // Clear fields
      } catch (err) {
        console.error("Registration error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Registration failed! Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // --- Login Logic ---
      try {
        // Make API call to login endpoint
        const res = await axios.post(`${API_URL}/login`, {
          email,
          password,
        });
        const { token } = res.data; // Assuming the backend returns a token
        login(token); // Use the login function from context to store the token/user info
        navigate("/"); // Redirect to home page or dashboard after successful login
        // No need to clear form on successful login as we navigate away
      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Login failed! Check your credentials.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#2C3930]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80 sm:w-96" // Responsive width
      >
        <Link to="/" className="flex justify-center align-center space-x-2">
        <img src={logoPureUp} alt="PureUp Logo" className="w-20 h-20" />
        </Link>
        <h2 className="text-2xl font-bold text-center text-[#2C3930] mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {/* Conditionally render Name field for registration */}
        <AnimatePresence>
          {isRegistering && (
            <motion.div
            key="name"
            variants={floatUp}
            initial="initial"
            animate="animate"
            exit="exit"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-[#38493f] focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegistering} // Required only when registering
                disabled={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email field (always shown) */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-[#38493f] focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        {/* Password field (always shown) */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-[#38493f] focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {/* Conditionally render Confirm Password field for registration */}
        <AnimatePresence>
          {isRegistering && (
            <motion.div
            key="confmPw"
            variants={floatDown}
            initial="initial"
            animate="animate"
            exit="exit"
            >
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-[#38493f] focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={isRegistering} // Required only when registering
                disabled={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display Error Messages */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Submit Button */}
        <AnimatePresence>
        {allFilled && (
          <motion.div
          key="RegSignButton"
            variants={floatDown}
            initial="initial"
            animate="animate"
            exit="exit"
          >
          <button
          type="submit"
          className={`w-full p-2 rounded-md transition duration-200 ${
            allFilled && !loading
              ? "bg-[#2C3930] text-white hover:bg-[#38493f]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!allFilled || loading}
        >
          {loading ? "Processing..." : isRegistering ? "Register" : "Log In"}
        </button>
          </motion.div>
        
      )}
      </AnimatePresence>
        

        {/* Toggle between Login and Register */}
        <p className="text-center text-sm text-gray-600">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button" // Important: prevent form submission
            onClick={toggleMode}
            disabled={loading}
            className="ml-1 text-[#4a6856] hover:underline focus:outline-none disabled:opacity-50"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
        {!allFilled && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Tip: Make sure all fields are filled and valid (Name, Email, Password).
        </p>
        )}

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <GoogleLogin
        onSuccess={credentialResponse => {
          console.log("Google login success:", credentialResponse);
          // You can call backend here to verify and handle JWT
        }}
        onError={() => {
          setError("Google Sign-In failed");
        }}
        />
      </form>
    </div>
  );
};

export default Login;

