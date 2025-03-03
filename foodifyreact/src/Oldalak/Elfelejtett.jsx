import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from '../Komponensek/Footer';
import '../Stilusok/Elfelejtett.css';

export const Elfelejtett = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email) {
        setError("Minden mezőt ki kell tölteni!");
        return;
      }
      alert(`Emailre küldött jelszó: ${email}`);
    };
  
    return (
      <div>
      <div className="auth-container">
        <h2 className="auth-h2">Elfelejtett jelszó</h2>
        <h3 className="auth-h2">Kérem adja meg az email címét amelyre el tudjuk küldeni a helyettesítő jelszót</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Küldés</button>
        </form>
        <p className="auth-p">Van már fiókod? <Link to="/bejelentkezes">Bejelentkezés</Link></p>
      </div>
      <Footer />
      </div>);
};
