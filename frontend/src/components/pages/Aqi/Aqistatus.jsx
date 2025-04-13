import React, { useState, useEffect } from "react";

export const Aqistatus = () => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Loading location...");

  const OPENWEATHER_API_KEY = "9d811ece2fc33b58fccc15b3240991e3";

  const getAqiStatus = (aqiValue) => {
    const aqi = aqiValue * 20;
    if (aqi <= 50) return { color: "bg-green-500", status: "Good", textColor: "text-green-600" };
    if (aqi <= 100) return { color: "bg-yellow-500", status: "Moderate", textColor: "text-yellow-600" };
    if (aqi <= 150) return { color: "bg-orange-500", status: "Unhealthy for Sensitive Groups", textColor: "text-orange-600" };
    if (aqi <= 200) return { color: "bg-red-500", status: "Unhealthy", textColor: "text-red-600" };
    if (aqi <= 300) return { color: "bg-purple-500", status: "Very Unhealthy", textColor: "text-purple-600" };
    return { color: "bg-maroon-500", status: "Hazardous", textColor: "text-maroon-600" };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
        });

        const { latitude, longitude } = position.coords;

        const aqiRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const aqiJson = await aqiRes.json();
        setAqiData(aqiJson.list[0]);

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const weatherJson = await weatherRes.json();
        setLocation(`${weatherJson.name}, ${weatherJson.sys.country}`);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 text-sm text-center">Loading air quality data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-center text-sm mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const aqiStatus = aqiData ? getAqiStatus(aqiData.main.aqi) : null;

  return (
    <div className="h-full w-full flex flex-col items-center justify-between">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Air Quality Index</h2>
        <p className="text-xs text-gray-500">{location}</p>
      </div>

      {/* AQI Circle and Status */}
      {aqiStatus && (
        <div className="flex flex-col items-center justify-center">
          <div className={`w-20 h-20 rounded-full ${aqiStatus.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
            {aqiData.main.aqi * 20}
          </div>
          <h3 className={`text-sm font-medium mt-2 ${aqiStatus.textColor}`}>
            {aqiStatus.status}
          </h3>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => window.location.href = "https://plant-recommender-dashboard.onrender.com/"}
        className="w-full mt-2 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md font-medium transition-colors"
      >
        Run Advanced Analysis
      </button>
    </div>
  );
};

export default Aqistatus;
