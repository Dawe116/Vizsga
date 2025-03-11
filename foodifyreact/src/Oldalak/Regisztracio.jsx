import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Stilusok/Regisztracio.css";
import sha256 from "js-sha256";
import Footer from '../Komponensek/Footer';

export const Regisztracio = () => {
  const [formData, setFormData] = useState({
    loginNev: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const nameRef = useRef(null);
  const loginNevRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;

    if (!formData.name.trim()) {
      errors.name = "A név megadása kötelező!";
    }
    if (!usernameRegex.test(formData.loginNev)) {
      errors.loginNev = "A felhasználónév legalább 4 karakterből állhat, és nem tartalmazhat speciális karaktereket!";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Érvénytelen email cím!";
    }
    if (!passwordRegex.test(formData.password)) {
      errors.password = "A jelszónak legalább 6 karakterből kell állnia, tartalmaznia kell kis- és nagybetűt, valamint egy számot!";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "A jelszavak nem egyeznek!";
    }
    
    setErrorMessages(errors);
    
    if (Object.keys(errors).length > 0) {
      if (errors.name) nameRef.current.focus();
      else if (errors.loginNev) loginNevRef.current.focus();
      else if (errors.email) emailRef.current.focus();
      else if (errors.password) passwordRef.current.focus();
      else if (errors.confirmPassword) confirmPasswordRef.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const generateSalt = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let salt = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salt += characters.charAt(randomIndex);
    }
    return salt;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const salt = generateSalt(64);
    const hashedPassword = sha256(formData.password + salt);

    const requestBody = {
      id: 0,
      loginNev: formData.loginNev,
      name: formData.name,
      salt,
      hash: hashedPassword,
      email: formData.email,
      permissionId: 1,
      active: true
    };

    setLoading(true);
    try {
      const response = await axios.post("https://localhost:5000/api/Registry", requestBody);

      if (response.status === 200) {
        setSuccessMessage("Sikeres regisztráció! Most már bejelentkezhetsz.");
        setFormData({ loginNev: "", name: "", email: "", password: "", confirmPassword: "" });
        setErrorMessages({});
      }
    } catch (error) {
      setErrorMessages({ server: error.response?.data?.message || "Hiba történt a regisztráció során!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="root">
      <div className="auth-container">
        <h2 className="auth-h2">Regisztráció</h2>
        {successMessage && <p className="success">{successMessage}</p>}
        {Object.values(errorMessages).map((msg, index) => (
          <p key={index} className="error">{msg}</p>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Teljes név"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            ref={nameRef}
            required
          />
          <input
            type="text"
            placeholder="Felhasználónév"
            value={formData.loginNev}
            onChange={(e) => setFormData({ ...formData, loginNev: e.target.value })}
            ref={loginNevRef}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            ref={emailRef}
            required
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            ref={passwordRef}
            required
          />
          <input
            type="password"
            placeholder="Jelszó megerősítése"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            ref={confirmPasswordRef}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Regisztráció..." : "Regisztráció"}
          </button>
        </form>
        <p className="auth-p">
          Van már fiókod? <Link to="/bejelentkezes">Bejelentkezés</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};