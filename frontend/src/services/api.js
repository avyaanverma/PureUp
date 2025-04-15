import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;


const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



// ✅ Fetch all plants
export const getAllPlants = async () => {
    const response = await api.get("/plants");
    return response.data;
};

// ✅ Fetch Plant of the Day
export const getPlantOfTheDay = async () => {
    const response = await api.get("/plant-of-the-day");
    return response.data;
};

// ✅ Fetch a single plant by ID
export const getPlantById = async (id) => {
    const response = await api.get(`/plants/${id}`);
    return response.data;
};

// ✅ Fetch all farmers
export const getAllFarmers = async () => {
    try {
        const response = await api.get("/farmers");
        return response.data;
    } catch (error) {
        console.error("Error fetching farmers:", error);
        return [];
    }
};

// ✅ Fetch all products
export const getAllProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Example login function
export const login = async (credentials) => {
    const response = await api.post("/user/login", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export default api;

