import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Stilusok/Bejelentkezes.css";
import Footer from '../Komponensek/Footer';
import sha256 from 'js-sha256';

export const Bejelentkezes = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    try {
      // Salt lekérése a backendről
      const saltResponse = await axios.post(`http://localhost:5000/api/Login/SaltRequest/${username}`); 
      const salt = saltResponse.data;

      // Jelszó hash-elése
      const tmpHash = sha256(password + salt.toString());
      const loginName = username;

      // Bejelentkezési kérés küldése
      const response = await axios.post("http://localhost:5000/api/Login", {
        loginName,
        tmpHash,
      });
      
      alert(`Sikeres bejelentkezés: ${response.data.token}`);
      localStorage.setItem("adatok", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      const adatok = localStorage.getItem("adatok");
      console.log(adatok);

      // A token és adatok beállítása az App komponensben
      navigate("/App");
    } catch (error) {
      setError(error.response?.data?.message || "Hiba történt a bejelentkezés során.");
    }
  };

  return (
    <div>
      <div className="auth-container">
        <h2 className="auth-h2">Bejelentkezés</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input id="loginNev" type="username" placeholder="Fellhasználónév" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input id="password" type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Bejelentkezés</button>
        </form>
        <p className="auth-p">Nincs fiókod? <Link to="/regisztracio">Regisztráció</Link></p>
      </div>
      <Footer />
    </div>
  );
};
