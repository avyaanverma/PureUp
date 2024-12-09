import React from 'react';

export const BuySoil = () => {
  const soils = [
    { name: 'Organic Soil', imageUrl: 'https://i5.walmartimages.com/asr/1cebf369-4233-4c1c-aa33-2be6a18f54fb_1.480359edb861186e852a7490fc84557c.jpeg' },
    { name: 'Cactus Soil', imageUrl: 'https://m.media-amazon.com/images/I/813mhr0pzML._AC_SL1500_.jpg' },
    { name: 'Succulent Soil', imageUrl: 'https://i5.walmartimages.com/asr/89837492-2a44-4032-a13e-2508912c8478.0680283b66a064226a2a349988204138.jpeg' },
    { name: 'Potting Soil', imageUrl: 'https://cocogarden.in/wp-content/uploads/2019/11/COCOGARDEN047-1867x2048.jpg' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Buy Some Soil</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {soils.map((soil, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-md bg-white">
            <img
              src={soil.imageUrl}
              alt={soil.name}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: 'transparent' }} // Ensures no background color
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <p className="text-white text-xl font-bold">{soil.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuySoil;
