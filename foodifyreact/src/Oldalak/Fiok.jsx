import React, { useState, useEffect } from "react";
import "../Stilusok/Fiok.css";
import Footer from '../Komponensek/Footer';
import axios from "axios";

export const Fiok = () => {
  const [data , setData] = useState([]);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [adatok] = useState(JSON.parse(localStorage.getItem("adatok")));

  // LocalStorage ellenőrzés
  const storedCimek = localStorage.getItem("cimek");
  const [cimek, setCimek] = useState(storedCimek ? JSON.parse(storedCimek) : []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/Address")
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
          setCimek(response.data);
          localStorage.setItem("cimek", JSON.stringify(response.data));
          console.log(response.data);
        } else {
          console.error("Hibás adatformátum az API-tól");
        }
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError(error.message);
      });
  }, []);

  const handleSave = () => {
    const newCim = { street: address };

    axios.post("http://localhost:5000/api/Address", newCim)
      .then(response => {
        setCimek(prev => [...prev, response.data]); // API válasza alapján frissítés
        localStorage.setItem("cimek", JSON.stringify([...cimek, response.data]));
        setIsEditing(false);
      })
      .catch(error => console.error("Hiba történt a mentés során:", error));
  };

  return (
    <div>
      <div className="account-card">
        <div className="account-card-header">
          <h2>Saját Fiók</h2>
        </div>
        <div className="account-card-content">
          <div className="account-info">
            <p><strong>Teljes név: {adatok.name}</strong> </p>
            <p><strong>Email: {adatok.email}</strong> </p>
          </div>
          <div className="account-address">
            <label>Lakcím: {cimek[2].street ? cimek[1].street : "Nincs megadva"}</label>

            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Add meg a lakcímedet..."
                className="account-input"
              />
            ) : null}
          </div>
          <div className="account-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="account-button save">Mentés</button>
                <button onClick={() => setIsEditing(false)} className="account-button cancel">Mégse</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="account-button edit">Szerkesztés</button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
