import React from "react";

export const BuySoil = () => {
  const soils = [
    {
      name: "Organic Potting Mix",
      imageUrl:
        "https://i5.walmartimages.com/asr/1cebf369-4233-4c1c-aa33-2be6a18f54fb_1.480359edb861186e852a7490fc84557c.jpeg",
      type: "All-Purpose",
    },
    {
      name: "Cactus Blend",
      imageUrl:
        "https://m.media-amazon.com/images/I/813mhr0pzML._AC_SL1500_.jpg",
      type: "Fast-Draining",
    },
    {
      name: "Seed Starter",
      imageUrl:
        "https://i5.walmartimages.com/asr/89837492-2a44-4032-a13e-2508912c8478.0680283b66a064226a2a349988204138.jpeg",
      type: "Fine Texture",
    },
    {
      name: "Vegetable Mix",
      imageUrl:
        "https://cocogarden.in/wp-content/uploads/2019/11/COCOGARDEN047-1867x2048.jpg",
      type: "Nutrient-Rich",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-2xl font-semibold mb-4">Buy Soil</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {soils.map((soil, index) => (
          <div key={index} className="group overflow-hidden rounded-lg">
            <img
              src={soil.imageUrl}
              alt={soil.name}
              loading="lazy"
              className="w-full h-[250px] object-contain rounded-t-lg"
            />

            <div className="p-2">
              <p className="text-sm text-gray-500">{soil.type}</p>
              <h3 className="font-medium">{soil.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuySoil;
