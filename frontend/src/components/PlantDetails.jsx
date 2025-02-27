import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlants, getPlantById } from "../services/api";

const PlantDetails = () => {
    const { id } = useParams();
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const fetchPlant = async () => {
            const data = await getAllPlants(id);
            setPlants(data);
        };
        fetchPlant();
    }, [id]);

    return (
        <div className="flex flex-wrap justify-center ax-w-6xl mx-auto">
            {plants.map((plant)=>(
                <div key={plant.id} className="flex justify-center bg-[#2C3930] rounded-lg shadow-lg m-4  w-64">
                    <div className="img w-36 h-36 flex items-center justify-center">
                        <img  src={plant.image} className="object-cover w-full h-full " alt="plantimage" />
                    </div>
                    <div className="flex-col p-4 space-y-4">
                        <h2 className="font-poppins font-semibold">{plant.name}</h2>
                        <p className="text-xs font-light">{plant.description}</p>
                        <p className="text-xs font-medium">₹{plant.price}</p>
                        <button type="button" className="text-gray-900 hover:text-white hover:bg-[#212121] border border-gray-300 focus:outline-none bg-green-100  focus:ring-4 focus:ring-gray-100 font-medium rounded-md text-xs   w-20 h-8 ">Add to Cart</button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default PlantDetails;
