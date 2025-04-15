import axios from 'axios';

const API = `${import.meta.env.VITE_BACKEND_URL}/api`; // update with your backend

export const login = async (email, password) => {
    const res = await axios.post(`${API}/user/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    return res.data;
};
