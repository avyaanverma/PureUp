import React from 'react';

export const Plant = () => {
  return (
    <div
      className="w-[600px] h-[350px] flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
      
      <div className="flex flex-col justify-start p-6">
        <h5
          className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
          Plant Of The Day: Aloe Vera
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Aloe Vera is a versatile plant known for its soothing and healing properties. It is widely used in skincare, medicinal treatments, and as a natural remedy for various ailments. Easy to grow and maintain, it’s a must-have for any plant lover.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">
          Last updated 3 mins ago
        </p>
      </div>

      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="https://dukaan.b-cdn.net/700x700/webp/media/8c16c85b-26c5-49fd-bac6-3a2add3f0fc5.png"
        alt="Aloe Vera" />
    </div>
  );
};

export default Plant;
