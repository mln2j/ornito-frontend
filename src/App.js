import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const HomePage = () => <h2>Dobrodošao! Uspješno prijavljen.</h2>; // Simulacija Home Page-a

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Provjera postoji li token u cookiesima prilikom učitavanja aplikacije
        const token = Cookies.get("auth_token");

        // Ako postoji token, postavi stanje na autentifikovano
        if (token) {
            setIsAuthenticated(true);
        }
    }, []); // Ovaj useEffect se poziva samo jednom prilikom inicijalnog rendera

    return (
        <Router>
            <Routes>
                {/* Ako je korisnik prijavljen, ide na HomePage, inače na Login */}
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </Router>
    );
}

export default App;
