import React from "react";

export const NearbyNurseries = () => {
  const nurseries = [
    { name: "Green Garden Nursery", imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/NcXWIp7FMhtjdpSNEV7dZw/l.jpg" },
    { name: "Urban Flora Nursery", imageUrl: "https://th.bing.com/th/id/R.2aec054531d5a434a1745a601350701b?rik=4UFzGFUnbQ%2fiUw&riu=http%3a%2f%2fstutzmans.com%2fwp-content%2fuploads%2f2014%2f01%2f1.jpg&ehk=4ldIu6AOg6A886QtTeTeqhjUweY5tBeGFe2hjPrOA3U%3d&risl=&pid=ImgRaw&r=0" },
    { name: "Sunny Fields Nursery", imageUrl: "https://cdn.motherhood.com.my/wp-content/uploads/2022/08/05173805/plants-featured.jpg" },
    { name: "Blossom Haven", imageUrl: "https://i.pinimg.com/originals/4a/4d/c1/4a4dc1742e2f08e1d2d699335259c040.jpg" },
  ];

  return (
    <div className="p-6 max-w-[900px] mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
        Nearby Nurseries
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {nurseries.map((nursery, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
            <img
              src={nursery.imageUrl}
              alt={nursery.name}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                {nursery.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyNurseries;
