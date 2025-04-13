import React from 'react';

// Full plant list (add more as you like)
const allPlants = [
  { 
    name: 'Aloe Vera', 
    imageUrl: 'https://dukaan.b-cdn.net/700x700/webp/media/8c16c85b-26c5-49fd-bac6-3a2add3f0fc5.png',
    type: 'Succulent'
  },
  { 
    name: 'Snake Plant', 
    imageUrl: 'https://www.mydomaine.com/thmb/lNxKuWZtIN2j6YOH-_wxLDvmyTs=/2230x2886/filters:no_upscale():max_bytes(150000):strip_icc()/the-sill_sansevieria-zeylanica-snake-plant_6_2230x.progressive-5e010d6edf454e3c913be21b19942306.jpg',
    type: 'Indoor'
  },
  { 
    name: 'Peace Lily', 
    imageUrl: 'https://www.mydomaine.com/thmb/9aB79USSkhiCVgGyXh1TBSvM7v8=/900x900/filters:fill(auto,1)/1566417254329_20190821-1566417255317-b9314f1d9f7a4668a466c5ffb1913a8f.jpg',
    type: 'Flowering'
  },
  { 
    name: 'Rubber Plant', 
    imageUrl: 'https://th.bing.com/th/id/OIP.pitsm3pWMQS7l1as1htBegHaLH?cb=iwc&rs=1&pid=ImgDetMain',
    type: 'Foliage'
  },
  {
    name: 'Spider Plant',
    imageUrl: 'https://img.crocdn.co.uk/images/products2/pl/20/00/03/17/pl2000031745.jpg?width=940&height=940',
    type: 'Indoor'
  },
  {
    name: 'Boston Fern',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0108/9460/6436/products/artificial-boston-fern-in-metallic-planter-nearly-natural-933763.jpg?v=1584171329',
    type: 'Foliage'
  },
  {
    name: 'ZZ Plant',
    imageUrl: 'https://th.bing.com/th/id/OIP.mWV2rp0ung6CU8m5vE5y7wHaJQ?w=208&h=260&c=7&r=0&o=5&cb=iwc&dpr=1.3&pid=1.7',
    type: 'Succulent'
  },
  {
    name: 'Monstera',
    imageUrl: 'https://th.bing.com/th/id/OIP.PEZl9IMoX58tmnCBVffvPQHaJl?cb=iwc&rs=1&pid=ImgDetMain',
    type: 'Foliage'
  }
];

// Function to get a random selection of plants
const getRandomPlants = (count) => {
  const shuffled = [...allPlants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const PlantWiki = () => {
  const plants = getRandomPlants(4); // Display 4 random plants each refresh

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">PlantWiki</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {plants.map((plant, index) => (
          <a
            key={index}
            href={`https://en.wikipedia.org/wiki/${plant.name.replace(/\s+/g, '_')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg block shadow hover:shadow-lg transition"
          >
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <p className="text-sm text-gray-500">{plant.type}</p>
              <h3 className="font-medium">{plant.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PlantWiki;
