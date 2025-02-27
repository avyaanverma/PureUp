import React, { useEffect, useState } from "react";
import { getPlantOfTheDay } from "../services/api";

const PlantOfTheDay = () => {
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        const fetchPlant = async () => {
            const data = await getPlantOfTheDay();
            setPlant(data);
        };
        fetchPlant();
    }, []);

    return (
        <div>
            <h2>Plant of the Day</h2>
            {plant ? (
                <div>
                    <h3>{plant.name}</h3>
                    <img src={plant.image} alt={plant.name} width="200" />
                    <p>{plant.description}</p>
                </div>
            ) : (
                <p>No plant of the day selected.</p>
            )}
        </div>
    );
};

export default PlantOfTheDay;
