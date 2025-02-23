import React, { useState } from "react";
import { register } from "../api/authApi"; // Import funkcije za registraciju
import { Link, useNavigate } from "react-router-dom"; // Link za preusmeravanje na login, useNavigate za preusmeravanje nakon uspješne registracije

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        firstname: "", // Promijenjeno iz "firstName" u "firstname"
        lastname: "",
        email: "",
        phone: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate(); // Za preusmeravanje na login stranicu nakon uspješne registracije

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Pozivamo funkciju za registraciju
            const response = await register(userData);
            alert("Registracija uspješna!");
            console.log(response);
            navigate("/login"); // Nakon uspješne registracije, preusmjeravamo na login stranicu
        } catch (error) {
            console.error("Greška pri registraciji", error);
            alert("Došlo je do greške pri registraciji.");
        }
    };

    return (
        <div className="RegisterPage">
            <div className="container">
                <h2>Registracija</h2>
                <div className="formWrapper">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstname" // Promijenjeno iz "firstName" u "firstname"
                            autoComplete="given-name"
                            placeholder="Ime"
                            value={userData.firstname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastname" // Promijenjeno iz "lastName" u "lastname"
                            autoComplete="family-name"
                            placeholder="Prezime"
                            value={userData.lastname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone" // Promijenjeno iz "phoneNumber" u "phone"
                            autoComplete="phone"
                            placeholder="Kontakt telefon"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            autoComplete="off"
                            placeholder="Korisničko ime"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Lozinka"
                            autoComplete="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Registriraj se</button>
                    </form>
                    <p>
                        Već imate račun? <Link to="/login">Prijavite se ovde</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
