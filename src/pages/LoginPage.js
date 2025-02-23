import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi"; // Import login funkcije
import { Link } from "react-router-dom"; // Link za preusmeravanje na registraciju

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState(""); // Držanje username-a u stanju
    const [password, setPassword] = useState(""); // Držanje lozinke u stanju
    const navigate = useNavigate(); // Navigacija nakon prijave

    const handleSubmit = async (e) => {
        e.preventDefault(); // Sprečava default ponašanje forme (refresh stranice)
        try {
            // Poziv login funkcije iz authApi koja sada pravi pravi API poziv
            await login({ username, password }); // Koristimo username umjesto email
            setIsAuthenticated(true); // Ako je login uspešan, postavljamo korisnika kao autentifikovanog
            navigate("/"); // Preusmeravamo na početnu stranicu nakon uspešnog login-a
        } catch (error) {
            console.error("Login neuspješan", error);
            alert("Neispravni podaci!"); // Obavještavamo korisnika o grešci
        }
    };

    return (
        <div className="LoginPage">
            <div className="container">
                <h2>Prijava</h2>
                <div className="formWrapper">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username" // Promijenjeno u "username"
                            placeholder="Korisničko ime"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Praćenje promjena u username inputu
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Lozinka"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Praćenje promjena u password inputu
                            required
                        />
                        <br/>
                        <button type="submit">Prijavi se</button> {/* Dugme za prijavu */}
                    </form>
                    <p>
                        Nemate račun? <Link to="/register">Registrirajte se ovde</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
