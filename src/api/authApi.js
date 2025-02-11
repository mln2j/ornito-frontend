import axios from "axios";

const API_URL = "http://localhost:5156"; // prilagodi ako backend koristi drugačiji port

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
