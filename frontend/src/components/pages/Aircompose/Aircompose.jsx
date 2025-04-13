import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export const Aircompose = () => {
  const chartRef = useRef(null);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirData = async () => {
      try {
        const API_KEY = '9d811ece2fc33b58fccc15b3240991e3';
        const lat = 40.7128;
        const lon = -74.0060;
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${await response.text()}`);
        }
        
        const data = await response.json();
        if (!data.list || !data.list[0].components) {
          throw new Error("Invalid API response format");
        }
        
        setAirData(data.list[0].components);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("API Fetch Error:", err);
      }
    };

    fetchAirData();
  }, []);

  useEffect(() => {
    if (!airData) return;
    
    const ctx = document.getElementById("chartPie").getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    const chartData = {
      labels: Object.keys(airData).map(key => key.toUpperCase()),
      datasets: [{
        data: Object.values(airData),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#8AC24A", "#F06292", "#7986CB", "#A1887F"
        ],
      }]
    };

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Add this to control aspect ratio
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20
            }
          }
        }
      }
    });

    return () => chartRef.current?.destroy();
  }, [airData]);

  if (loading) return (
    <div className="h-full flex items-center justify-center bg-white rounded-lg shadow">
      <div className="p-4 text-center">Loading air data...</div>
    </div>
  );

  if (error) return (
    <div className="h-full flex items-center justify-center bg-white rounded-lg shadow">
      <div className="p-4 text-red-500">Error: {error}</div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow">
      <div className="py-3 px-5 bg-green-100 font-bold rounded-t-lg">
        Real-Time Air Composition
      </div>
      <div className="flex-1 p-4" style={{ minHeight: '250px' }}>
        <canvas 
          id="chartPie" 
          className="w-full h-full"
        />
      </div>
    </div>
  );
};