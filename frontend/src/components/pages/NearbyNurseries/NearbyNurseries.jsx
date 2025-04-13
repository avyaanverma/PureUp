import React from "react";

export const NearbyNurseries = () => {
  const nurseries = [
    { 
      name: "Green Garden Nursery", 
      imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/NcXWIp7FMhtjdpSNEV7dZw/l.jpg",
      type: "Store"
    },
    { 
      name: "Urban Flora Nursery", 
      imageUrl: "https://th.bing.com/th/id/OIP.8Bx5v9XUekzX-WB2mW1-HAHaE7?cb=iwc&rs=1&pid=ImgDetMain",
      type: "Center" 
    },
    { 
      name: "Sunny Fields Nursery", 
      imageUrl: "https://cdn.motherhood.com.my/wp-content/uploads/2022/08/05173805/plants-featured.jpg",
      type: "Store"
    },
    { 
      name: "Blossom Haven", 
      imageUrl: "https://i.pinimg.com/originals/4a/4d/c1/4a4dc1742e2f08e1d2d699335259c040.jpg",
      type: "Center" 
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4">Nearby Nurseries</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {nurseries.map((nursery, index) => (
          <div key={index} className="group overflow-hidden rounded-lg">
            <img
              src={nursery.imageUrl}
              alt={nursery.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <p className="text-sm text-gray-500">{nursery.type}</p>
              <h3 className="font-medium">{nursery.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyNurseries;