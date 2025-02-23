import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwtDecode(token); // Dekodiramo token
        return decoded.sub || decoded.userId; // Dohvaćamo user ID iz polja "sub" ili "userId"
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

// URL tvoje backend aplikacije
const API_URL = "http://192.168.0.111:5156";  // Provjeri da li je ovo ispravan port i putanja

// Login funkcija
export const login = async (credentials) => {
    try {
        // Pošaljemo API poziv s korisničkim podacima
        const response = await axios.post(`${API_URL}/login`, {
            username: credentials.username,  // Ovdje šaljemo username
            password: credentials.password
        });

        // Ako je login uspješan, server treba vratiti token
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Spremi token u cookie na 1 dan
        Cookies.set("auth_token", token, { expires: 1 });

        window.scrollTo(0, 0); // Resetiraj scroll na vrh
        return response.data; // Vraća podatke sa servera (npr. token)
    } catch (error) {
        // Ako dođe do greške, baci error
        throw new Error("Neispravni podaci!");
    }
};

// Odjava - briše token iz cookiesa
export const logout = () => {
    Cookies.remove("auth_token");
};



// Dohvati trenutni token iz cookiesa
export const getAuthToken = () => {
    return Cookies.get("auth_token");
};

// Registracija funkcija
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username: userData.username,
            password: userData.password
        });

        return response.data; // Potvrda o uspješnoj registraciji
    } catch (error) {
        throw new Error("Greška pri registraciji");
    }
};
