import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Stilusok/Regisztracio.css";
import sha256 from "js-sha256";
import Footer from "../Komponensek/Footer";
import AuthModal from "../Komponensek/AuthModal";

export const Regisztracio = () => {
  const [formData, setFormData] = useState({
    name: "",
    loginNev: "",
    email: "",
    password: "",
    confirmPassword: "",
    county: "",
    postalCode: "",
    city: "",
    street: "",
    houseNumber: "",
    floor: "",
    door: ""
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [counties, setCounties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:5000/api/County")
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setCounties(response.data);
        }
      })
      .catch(error => {
        setErrorMessages({ ...errorMessages, counties: "Hiba történt a megyék lekérésekor." });
      });
  }, []);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.loginNev) errors.loginNev = "Felhasználónév nem lehet üres!";
    if (!formData.name) errors.name = "Név nem lehet üres!";
    if (!formData.email) errors.email = "Email nem lehet üres!";
    if (!formData.password) errors.password = "Jelszó nem lehet üres!";
    if (!formData.confirmPassword) errors.confirmPassword = "Jelszó megerősítése nem lehet üres!";

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Érvénytelen email formátum!";
    }

    if (formData.password && !validatePassword(formData.password)) {
      errors.password = "A jelszónak legalább 8 karakter hosszúnak kell lennie!";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "A jelszavak nem egyeznek!";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    const generateSalt = (length) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let salt = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        salt += characters.charAt(randomIndex);
      }
      return salt;
    };

    const salt = generateSalt(64);
    const hashedPassword = sha256(formData.password + salt);

    const requestBody = {
      loginNev: formData.loginNev,
      hash: hashedPassword,
      salt: salt,
      name: formData.name,
      permissionId: 1,
      email: formData.email,
      active: true,
      address: {
        countyId: formData.county,
        postalCode: formData.postalCode,
        city: formData.city,
        street: formData.street,
        houseNumber: formData.houseNumber,
        floor: formData.floor || null,
        door: formData.door || null
      }
    };

    try {
      const response = await axios.post("https://localhost:5000/api/Registry", requestBody);

      if (response.status === 200) {
        setModalMessage("Sikeres regisztráció! Most már bejelentkezhetsz.");
        setIsSuccess(true);
      }
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Hiba történt a regisztráció során.");
      setIsSuccess(false);
    } finally {
      setIsModalOpen(true);
    }
  };

  const handleRetry = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      loginNev: "",
      email: "",
      password: "",
      confirmPassword: "",
      county: "",
      postalCode: "",
      city: "",
      street: "",
      houseNumber: "",
      floor: "",
      door: ""
    });
    setErrorMessages({});
  };

  return (
    <div id="root">
      <div className="auth-container register">
        <h2 className="auth-h2">Regisztráció</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Teljes név" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errorMessages.name ? "error" : ""}
          />
          {errorMessages.name && <span className="error-message">{errorMessages.name}</span>}

          <input 
            type="text" 
            placeholder="Felhasználónév" 
            value={formData.loginNev} 
            onChange={(e) => setFormData({ ...formData, loginNev: e.target.value })}
            className={errorMessages.loginNev ? "error" : ""}
          />
          {errorMessages.loginNev && <span className="error-message">{errorMessages.loginNev}</span>}

          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errorMessages.email ? "error" : ""}
          />
          {errorMessages.email && <span className="error-message">{errorMessages.email}</span>}

          <input 
            type="password" 
            placeholder="Jelszó" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={errorMessages.password ? "error" : ""}
          />
          {errorMessages.password && <span className="error-message">{errorMessages.password}</span>}

          <input 
            type="password" 
            placeholder="Jelszó megerősítése" 
            value={formData.confirmPassword} 
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={errorMessages.confirmPassword ? "error" : ""}
          />
          {errorMessages.confirmPassword && <span className="error-message">{errorMessages.confirmPassword}</span>}
          <label className="address-label"><strong>Szállítási cím:</strong> </label>
          <select name="county" value={formData.county} className="megye-lista" onChange={(e) => setFormData({ ...formData, county: e.target.value })}>
            <option value="">Válassz megyét</option>
            {counties.map(county => (
              <option key={county.id} value={county.id}>{county.name}</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Irányítószám" 
            value={formData.postalCode} 
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Város" 
            value={formData.city} 
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Utca" 
            value={formData.street} 
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Házszám" 
            value={formData.houseNumber} 
            onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Emelet (nem kötelező)" 
            value={formData.floor} 
            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Ajtó (nem kötelező)" 
            value={formData.door} 
            onChange={(e) => setFormData({ ...formData, door: e.target.value })}
          />

          <button className="submit-btn" type="submit">Regisztráció</button>
        </form>
      </div>

      {isModalOpen && (
        <AuthModal 
          message={modalMessage} 
          isSuccess={isSuccess} 
          onClose={() => navigate("/bejelentkezes")} 
          onRetry={handleRetry} 
          successRedirect="/bejelentkezes" 
        />
      )}

      <Footer />
    </div>
  );
};