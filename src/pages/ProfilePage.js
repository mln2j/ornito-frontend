import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getAchievements } from "../api/achievementsApi"; // Import funkcije za dohvaćanje postignuća
import { getHistory } from "../api/historyApi";

const ProfilePage = () => {
    const [username, setUsername] = useState("Nepoznati korisnik");
    const [userId, setUserId] = useState("");
    const [achievements, setAchievements] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("auth_token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.name || "Nepoznati korisnik");
                setUserId(decoded.sub);

                fetchAchievements(decoded.sub);
                fetchHistory(decoded.sub);
            } catch (error) {
                console.error("Greška pri dekodiranju tokena:", error.message);
            }
        } else {
            console.error("Token nije pronađen!");
        }
    }, []);

    const fetchAchievements = async (userId) => {
        try {
            const achievementsData = await getAchievements(userId);
            setAchievements(achievementsData);
        } catch (error) {
            console.error("Greška pri dohvaćanju postignuća:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async (userId) => {
        try {
            const historyData = await getHistory(userId); // Ispravna API funkcija za povijest
            setHistory(historyData);
        } catch (error) {
            console.error("Greška pri dohvaćanju povijesti:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Učitavanje podataka...</div>;
    }

    return (
        <div className="container">
            <h1>{username}</h1>
            <fieldset className="achievements">
                <legend>Postignuća</legend>
                {achievements.map((achievement) => (
                    <div className="achievement" key={achievement.id}>
                        <p>{achievement.achievementName}</p>
                        <small>{achievement.description}</small>
                    </div>
                ))}
            </fieldset>
            <fieldset className="history">
                <legend>Skenirano voće</legend>
                {history.map((historyItem) => (
                    <div className="historyItem" key={historyItem.id}>
                        <p>{historyItem.fruitName}[{historyItem.varietyName}]</p>
                        <small>{historyItem.description}</small>
                    </div>

                ))}
            </fieldset>
        </div>
    );
};

export default ProfilePage;