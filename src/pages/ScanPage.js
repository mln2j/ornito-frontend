import React, { useState } from "react";

const ScanPage = () => {
    const [selectedFile, setSelectedFile] = useState(null); // Sprema odabranu fotografiju
    const [preview, setPreview] = useState(null); // Prikazuje pregled fotografije
    const [loading, setLoading] = useState(false); // Indikator učitavanja
    const [prediction, setPrediction] = useState(""); // Sprema rezultat predikcije
    const [isUploaded, setIsUploaded] = useState(false); // Praćenje je li fotografija poslana

    // Funkcija za rukovanje odabirom datoteke
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Generira URL za pregled slike
        }
    };

    // Funkcija za rukovanje drag & drop funkcionalnošću
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Sprječava zadano ponašanje prilikom drag & drop-a
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Funkcija za slanje fotografije na server
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Molimo odaberite fotografiju prije slanja.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("http://192.168.0.111:5156/api/Fruit/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Greška prilikom slanja fotografije.");
            }

            const data = await response.json();
            setPrediction(data.prediction); // Pretpostavljamo da backend vraća polje 'prediction'
            setIsUploaded(true); // Postavljamo da je upload završen
        } catch (error) {
            console.error("Greška:", error.message);
            alert("Došlo je do greške prilikom slanja fotografije.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ScanPage">
            <div className="container">
                <h1>Skeniranje voća</h1>

                {preview && (
                    <div className="preview">
                        <img src={preview} alt="Pregled" style={{ maxWidth: "100%", maxHeight: "300px" }} />
                    </div>
                )}

                {/* Sakrij upload zonu i gumb ako je fotografija poslana */}
                {!isUploaded && (
                    <>
                        <div
                            className="drop-zone"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <p>Povucite i ispustite fotografiju ovdje ili kliknite za upload.</p>
                        </div>

                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || loading} // Onemogućeno ako nema datoteke ili ako se učitava
                        >
                            {loading ? "Učitavanje..." : "Pošalji Fotografiju"}
                        </button>
                    </>
                )}

                {/* Prikaz rezultata predikcije */}
                {prediction && (
                    <div className="prediction" style={{ marginTop: "20px" }}>
                        <h2>Rezultat:</h2>
                        <p>{prediction}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScanPage;