import React from 'react';

const plants = [
  {
    name: "Aloe Vera",
    image: "https://dukaan.b-cdn.net/700x700/webp/media/8c16c85b-26c5-49fd-bac6-3a2add3f0fc5.png",
    description: "Aloe Vera is a versatile plant known for its soothing and healing properties.",
  },
  {
    name: "Snake Plant",
    image: "https://www.mydomaine.com/thmb/lNxKuWZtIN2j6YOH-_wxLDvmyTs=/2230x2886/filters:no_upscale():max_bytes(150000):strip_icc()/the-sill_sansevieria-zeylanica-snake-plant_6_2230x.progressive-5e010d6edf454e3c913be21b19942306.jpg",
    description: "Snake plants are known for improving indoor air quality and are low-maintenance.",
  },
  {
    name: "Peace Lily",
    image: "https://www.mydomaine.com/thmb/9aB79USSkhiCVgGyXh1TBSvM7v8=/900x900/filters:fill(auto,1)/1566417254329_20190821-1566417255317-b9314f1d9f7a4668a466c5ffb1913a8f.jpg",
    description: "Peace Lilies thrive indoors and bloom elegant white flowers.",
  },
  {
    name: "Spider Plant",
    image: "https://nestreeo.com/wp-content/uploads/2020/05/spider-plant-2-scaled.jpg",
    description: "Spider plants are easy to care for and produce small plantlets.",
  },
  {
    name: "Money Plant",
    image: "https://cdn.shopify.com/s/files/1/0663/9613/articles/Money_plant.webp?v=1679918387",
    description: "Money plants are considered to bring good luck and purify the air.",
  },
];

export const Plant = () => {
  const randomPlant = plants[Math.floor(Math.random() * plants.length)];

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          className="w-full h-48 md:h-full object-cover rounded-lg"
          src={randomPlant.image}
          alt={randomPlant.name}
        />
      </div>
      <div className="md:w-2/3 p-4">
        <h5 className="text-xl font-medium text-neutral-800 mb-2">
          Plant Of The Day: {randomPlant.name}
        </h5>
        <p className="text-neutral-600 mb-4">
          {randomPlant.description}
        </p>
        <p className="text-xs text-neutral-500">Refreshed just now</p>
      </div>
    </div>
  );
};

export default Plant;
