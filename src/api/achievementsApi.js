import axios from "axios";

const API_URL = "http://192.168.0.111:5156"; // URL vašeg backend API-ja

// Dohvat svih postignuća korisnika
export const getAchievements = async (userId) => {
    try {
        // Dodajemo UserID kao query parametar
        const response = await axios.get(`${API_URL}/get-achievements`, {
            params: {
                UserID: userId, // Query parametar za UserID
            },
        });
        return response.data; // Vraćamo podatke o postignućima
    } catch (error) {
        console.error("Greška pri dohvaćanju postignuća:", error.response?.data || error.message);
        throw error;
    }
};