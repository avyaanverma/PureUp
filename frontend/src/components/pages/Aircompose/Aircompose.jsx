import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const Aircompose = () => {
  const chartRef = useRef(null); // Ref to hold the chart instance

  useEffect(() => {
    const ctx = document.getElementById("chartPie").getContext("2d");

    // If a chart instance already exists, destroy it before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const dataPie = {
      labels: ["Nitrogen (N₂)", "Oxygen (O₂)", "Argon (Ar)", "Carbon Dioxide (CO₂)"],
      datasets: [
        {
          label: "Air Composition",
          data: [78, 21, 0.93, 0.04],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
            "rgb(101, 143, 241)",
            "rgb(241, 233, 101)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configPie = {
      type: "pie",
      data: dataPie,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    };

    // Create a new chart instance and save it to the ref
    chartRef.current = new Chart(ctx, configPie);

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-green-100 text-center">Air Composition</div>
      <canvas className="p-1 ml-40 mr-40" id="chartPie"></canvas>
    </div>
  );
};

export default Aircompose;
