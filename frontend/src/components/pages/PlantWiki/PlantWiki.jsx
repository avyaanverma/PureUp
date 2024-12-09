import React from 'react';

export const PlantWiki = () => {
  const plants = [
    { name: 'Aloe Vera', imageUrl: 'https://dukaan.b-cdn.net/700x700/webp/media/8c16c85b-26c5-49fd-bac6-3a2add3f0fc5.png' },
    { name: 'Cactus', imageUrl: 'https://th.bing.com/th/id/OIP.u1xUepATkC_J0onL1iz5wAHaFj?rs=1&pid=ImgDetMain' },
    { name: 'Succulent', imageUrl: 'https://external-preview.redd.it/grRxfGUXidnUu4iOWFrwSe4xmdaEcZFSbVu4q8iYe7Q.jpg?auto=webp&s=db5f2a1f7a8af0a55dd254cdc561e71a2f976d4a' },
    { name: 'Fern', imageUrl: 'https://th.bing.com/th/id/OIP.Dbk8K_rpqX9rADu7Sb3L4gHaFk?rs=1&pid=ImgDetMain' },
  ];

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">PlantWiki</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {plants.map((plant, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-md bg-white">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
              <p className="text-white text-xl font-bold">{plant.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantWiki;
