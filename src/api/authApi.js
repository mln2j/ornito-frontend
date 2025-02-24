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
const API_URL = "http://192.168.0.111:5156"; // Provjeri da li je ovo ispravan port i putanja

// Login funkcija
export const login = async (credentials) => {
    try {
        // Pošaljemo API poziv s korisničkim podacima
        const response = await axios.post(`${API_URL}/login`, {
            username: credentials.username, // Ovdje šaljemo username
            password: credentials.password,
        });

        // Ako je login uspješan, server treba vratiti token
        const token = response.data.token;
        localStorage.setItem("token", token);

        // Spremi token u cookie na 2 tjedna
        Cookies.set("auth_token", token, { expires: 14 });

        window.scrollTo(0, 0); // Resetiraj scroll na vrh
        return response.data; // Vraća podatke sa servera (npr. token)
    } catch (error) {
        console.error("Greška pri prijavi:", error.response?.data || error.message);
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

// Registracija funkcija s automatskim loginom
export const register = async (userData) => {
    try {
        // Pošaljite sve podatke potrebne za registraciju
        const response = await axios.post(`${API_URL}/register`, {
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            phoneNumber: userData.phone,
            username: userData.username,
            password: userData.password,
        });

        console.log("Registracija uspješna:", response.data);

        // Nakon uspješne registracije, automatski pozivamo login
        const loginResponse = await login({
            username: userData.username,
            password: userData.password,
        });

        console.log("Automatski login uspješan:", loginResponse);

        return { registration: response.data, login: loginResponse }; // Vraća podatke o registraciji i loginu
    } catch (error) {
        console.error("Greška pri registraciji:", error.response?.data || error.message);
        throw new Error("Greška pri registraciji");
    }
};
