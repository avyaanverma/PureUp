import React, { useEffect, useState } from "react";
import { getAllPlants } from "../services/api";
import { Link } from "react-router-dom";

const PlantList = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const fetchPlants = async () => {
            const data = await getAllPlants();
            setPlants(data);
        };
        fetchPlants();
    }, []);

    return (
        <div>
            <h2>Available Plants</h2>
            <ul>
                {plants.map((plant) => (
                    <li key={plant._id}>
                        <Link to={`/plant/${plant._id}`}>{plant.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlantList;
