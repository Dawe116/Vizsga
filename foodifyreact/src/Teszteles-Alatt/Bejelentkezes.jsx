import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../Teszteles-Alatt/Bejelentkezes.css";

// Bejelentkezés oldal
export const Bejelentkezes = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }
    alert(`Bejelentkezve: ${email}`);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-h2">Bejelentkezés</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Bejelentkezés</button>
      </form>
      <p className="auth-p">Nincs fiókod? <Link to="/regisztracio">Regisztráció</Link></p>
    </div>
  );
};
