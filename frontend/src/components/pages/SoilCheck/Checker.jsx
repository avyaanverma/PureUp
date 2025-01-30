import React from 'react';

export const Checker = () => {
  const handleCheckSoil = () => {
    alert("Soil check functionality coming soon!");
  };

  return (
    <div className="max-w-sm mx-auto text-center p-5 sm:p-7 border border-gray-300 rounded-lg shadow-md w-full">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 text-gray-900">Soil Checker</h1>
      <p className="text-xs sm:text-sm text-gray-600 mb-6">
        Use this tool to select the type of soil and its moisture level to evaluate conditions for plant growth.
      </p>

      {/* Form */}
      <form>
        {/* Type of Soil Selector */}
        <label htmlFor="soil-type" className="block mb-2 text-sm font-medium text-gray-900">
          Type of Soil
        </label>
        <select id="soil-type" className="block w-full p-2 mb-4 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500">
          <option value="" disabled selected>Select soil type</option>
          {["Clay", "Sandy", "Loamy", "Peaty", "Chalky"].map((type, index) => (
            <option key={index} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>

        {/* Moisture Level Selector */}
        <label htmlFor="moisture-level" className="block mb-2 text-sm font-medium text-gray-900">
          Moisture Level (1-10)
        </label>
        <select id="moisture-level" className="block w-full px-4 py-2 text-base border rounded-lg bg-gray-50 focus:ring-blue-500">
          <option value="" disabled selected>Select moisture level</option>
          {[...Array(10).keys()].map((level) => (
            <option key={level} value={level + 1}>{level + 1}</option>
          ))}
        </select>

        {/* Check Soil Button */}
        <button
          type="button"
          onClick={handleCheckSoil}
          className="w-full px-4 py-2 text-white bg-green-800 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-blue-300"
        >
          Check Soil
        </button>
      </form>
    </div>
  );
};

export default Checker;
