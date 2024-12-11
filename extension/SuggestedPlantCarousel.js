import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@shadcn/ui';

const SuggestedPlantCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const plants = [
    {
      title: 'Spider Plant',
      image: '1.jpg',
      description: 'Despite their creepy-crawly name, spider plants (Chlorophytum comosum) are among the most popular houseplants.'
    },
    {
      title: 'Aloe Vera',
      image: '2.jpg',
      description: 'Aloe vera is a succulent plant known for its ability to soothe skin and its air-purifying properties.'
    },
    {
      title: 'Snake Plant',
      image: '3.jpg',
      description: 'The Snake Plant (Sansevieria) is a hardy indoor plant known for its air-purifying abilities and low maintenance needs.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % plants.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Our Pick: {plants[currentIndex].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="plant-image-placeholder">
          <img src={plants[currentIndex].image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
        <p className="plant-info">{plants[currentIndex].description}</p>
      </CardContent>
    </Card>
  );
};

export default SuggestedPlantCarousel;