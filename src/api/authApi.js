import axios from "axios";

const API_URL = "http://localhost:5156/api"; // prilagodi prema C# backendu

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};
