import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../Teszteles-Alatt/Regisztracio.css";

// Regisztráció oldal
export const Regisztracio = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }
    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek!");
      return;
    }
    alert(`Regisztrálva: ${name}, ${email}`);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-h2">Regisztráció</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Teljes név" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Jelszó megerősítése" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Regisztráció</button>
      </form>
      <p className="auth-p">Van már fiókod? <Link to="/bejelentkezes">Bejelentkezés</Link></p>
    </div>
  );
};