import React from "react";

export const Aqistatus = () => {
  return (
    <div className="flex justify-center items-center px-4">
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full"
      >
        <div className="flex flex-col justify-between p-4 leading-normal text-center md:text-left">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            AQI Level: Good (50)
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm md:text-base">
            Monitor the air quality in your city and stay informed about pollutants that may affect your health.
          </p>
        </div>
      </a>
    </div>
  );
};

export default Aqistatus;
