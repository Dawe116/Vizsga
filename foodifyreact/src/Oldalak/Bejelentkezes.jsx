import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Stilusok/Bejelentkezes.css";
import sha256 from "js-sha256";
import Footer from "../Komponensek/Footer";
import AuthModal from "../Komponensek/AuthModal";

export const Bejelentkezes = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    try {
      const saltResponse = await axios.post(`https://localhost:5000/api/Login/SaltRequest/${username}`); 
      const salt = saltResponse.data;

      const tmpHash = sha256(password + salt.toString());
      const loginName = username;

      const response = await axios.post("https://localhost:5000/api/Login", {
        loginName,
        tmpHash,
      });

      localStorage.setItem("adatok", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      setModalMessage("Sikeres bejelentkezés!");
      setIsSuccess(true);
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Hiba történt a bejelentkezés során.");
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleRetry = () => {
    setIsModalOpen(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div id="root">
      <div className="login-container">
        <h2 className="auth-h2">Bejelentkezés</h2>
        <form onSubmit={handleSubmit}>
          <input id="loginNev" type="text" placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input id="password" type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="submit-btn" type="submit">Bejelentkezés</button>
        </form>
        <p className="auth-p">Nincs fiókod? <Link to="/regisztracio">Regisztráció</Link></p>
      </div>
      <Footer />
      {isModalOpen && (
        <AuthModal 
          message={modalMessage} 
          isSuccess={isSuccess} 
          onClose={() => navigate("/foodifyhome")} 
          onRetry={handleRetry} 
          successRedirect="/foodifyhome" 
        />
      )}
    </div>
  );
};