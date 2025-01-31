import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const Aircompose = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("chartPie").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const isDarkMode = document.documentElement.classList.contains("dark");

    const dataPie = {
      labels: ["Nitrogen (N₂)", "Oxygen (O₂)", "Argon (Ar)", "Carbon Dioxide (CO₂)"],
      datasets: [
        {
          label: "Air Composition",
          data: [78, 21, 0.93, 0.04],
          backgroundColor: ["rgb(133, 105, 241)", "rgb(164, 101, 241)", "rgb(101, 143, 241)", "rgb(241, 233, 101)"],
          hoverOffset: 4,
        },
      ],
    };

    const configPie = {
      type: "pie",
      data: dataPie,
      options: {
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: isDarkMode ? "#ffffff" : "#000000", // Legend text adapts to dark mode
            },
          },
        },
      },
    };

    chartRef.current = new Chart(ctx, configPie);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-full max-w-[500px] mx-auto bg-white dark:bg-gray-800">
      <div className="py-3 px-5 bg-green-100 dark:bg-green-900 text-center text-lg font-semibold text-gray-900 dark:text-white">
        Air Composition
      </div>
      <div className="p-4">
        <canvas id="chartPie"></canvas>
      </div>
    </div>
  );
};

export default Aircompose;
