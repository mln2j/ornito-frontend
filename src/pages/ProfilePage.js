import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
    // Dohvatite token iz kolačića
    const token = Cookies.get("auth_token");

    // Dekodirajte token kako biste dobili korisničko ime
    let username = "";
    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.name || decoded.username || "Nepoznati korisnik"; // Pretpostavljamo da je "name" ili "username" u tokenu
        } catch (error) {
            console.error("Greška pri dekodiranju tokena:", error.message);
        }
    }

    return (
        <div className="container">
            <h1>{username}</h1>
            <p>Ovo je početna stranica aplikacije.</p>
        </div>
    );
};

export default ProfilePage;
