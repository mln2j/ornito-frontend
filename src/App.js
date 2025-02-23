import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Početna vrijednost je null

    const checkToken = () => {
        const token = Cookies.get("auth_token");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const decoded = jwtDecode(token); // Dekodiramo JWT
            const currentTime = Date.now() / 1000; // Trenutno vrijeme u sekundama
            if (decoded.exp && decoded.exp > currentTime) {
                setIsAuthenticated(true); // Token je valjan
            } else {
                console.warn("Token je istekao.");
                setIsAuthenticated(false);
                Cookies.remove("auth_token"); // Uklanjamo token ako je istekao
            }
        } catch (error) {
            console.error("Greška pri dekodiranju tokena:", error.message);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        Cookies.remove("auth_token");
        setIsAuthenticated(false);
    };

    useEffect(() => {
        checkToken(); // Provjera tokena prilikom učitavanja aplikacije
    }, []);


    if (isAuthenticated === null) {
        // Prikaz loadera dok se stanje ne postavi
        return <div>Učitavanje...</div>;
    }

    return (
        <Router>
            {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} logout={logout} />}
            <Routes>
                {/* Ako je korisnik prijavljen, ide na HomePage, inače na Login */}
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </Router>
    );
}

export default App;
