import React from "react";
import { Link } from "react-router-dom"; // Koristimo Link iz React Router-a za navigaciju
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const HomePage = () => {
    const token = Cookies.get("auth_token");
    let username = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.name;
        } catch (error) {
            console.error("Greška pri dekodiranju tokena:", error.message);
        }
    } else {
        console.error("Token nije pronađen!");
    }

    return (
        <div className="container">
            <h2>Pozdrav {username}!</h2>
            <div className="controls">
                <Link to="/scan" className="scanLink">
                    <div>
                        <p>Novi</p>
                        <p>Sken</p>
                    </div>
                </Link>
                {/* Link za profil */}
                <Link to="/profile" className="profileLink">
                    <div>
                        <p>Moj</p>
                        <p>Profil</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;