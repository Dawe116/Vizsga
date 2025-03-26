import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Stilusok/Elfelejtett.css';
import Footer from '../Komponensek/Footer';

export const Elfelejtett = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Minden mezőt ki kell tölteni!");
            setSuccess("");
            return;
        }
        if (!validateEmail(email)) {
            setError("Érvénytelen email cím!");
            setSuccess("");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/Jelszo/${email}`);

            if (response.status === 200) {
                setSuccess("Az e-mail sikeresen elküldve!");
                setError("");
                setEmail("");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Hiba történt az e-mail küldése közben.");
            setSuccess("");
        }
    };

    return (
<div id="root">
            <div className="forgot-container">
                <h2 className="auth-h2">Elfelejtett jelszó</h2>
                <h3 className="auth-h2">Kérem adja meg az email címét, amelyre el tudjuk küldeni a helyettesítő jelszót</h3>
                
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <button className="submit-btn "  type="submit">Küldés</button>
                </form>
                
                <p className="auth-p">
                    Van már fiókod? <Link to="/bejelentkezes">Bejelentkezés</Link>
                </p>
            </div>
            <Footer />
        </div>
    );
};
