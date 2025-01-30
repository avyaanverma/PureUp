import React from 'react';

export const Slider = () => {
  return (
    <div id="animation-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel Wrapper */}
      <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden rounded-lg">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="hidden duration-200 ease-linear" data-carousel-item>
            <img
              src={`https://source.unsplash.com/800x600/?nature,plants&sig=${index}`}
              className="absolute block w-full h-full object-cover"
              alt="..."
            />
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-30 flex items-center justify-center p-2 bg-white/30 rounded-full hover:bg-white/50"
        data-carousel-prev
      >
        ❮
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-30 flex items-center justify-center p-2 bg-white/30 rounded-full hover:bg-white/50"
        data-carousel-next
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
