import axios from "axios";

const API_URL = "http://localhost:8000/api";

// ✅ Fetch all plants
export const getAllPlants = async () => {
    const response = await axios.get(`${API_URL}/plants`);
    return response.data;
};

// ✅ Fetch Plant of the Day
export const getPlantOfTheDay = async () => {
    const response = await axios.get(`${API_URL}/plant-of-the-day`);
    return response.data;
};

// ✅ Fetch a single plant by ID
export const getPlantById = async (id) => {
    const response = await axios.get(`${API_URL}/plants/${id}`);
    return response.data;
};


