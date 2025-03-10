import React, { useState, useEffect } from "react";
import "../Stilusok/Fiok.css";
import axios from "axios";
import Footer from '../Komponensek/Footer';

export const Fiok = () => {
  const [data , setData] = useState([]);
  const [error, setError] = useState(null);
  const [county, setCounty] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [door, setDoor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [adatok] = useState(JSON.parse(localStorage.getItem("adatok")));
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!county || !postalCode || !city || !street || !houseNumber) {
      setErrorMessage("Minden kötelező mezőt ki kell tölteni!");
      return;
    }

    setErrorMessage("");
    const newCim = { county, postalCode, city, street, houseNumber, floor, door };

    axios.post("http://localhost:5000/api/Address", newCim)
      .then(response => {
        setCimek(prev => [...prev, response.data]);
        localStorage.setItem("cimek", JSON.stringify([...cimek, response.data]));
        setIsEditing(false);
      })
      .catch(error => console.error("Hiba történt a mentés során:", error));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage("");
  };

  return (
<div id="root">
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
            <label>Lakcím: {cimek[1] ? null : "Nincs megadva"}</label>

            {isEditing ? (
              <>
                <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} placeholder="Megye" className="account-input" />
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Irányítószám" className="account-input" />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Város" className="account-input" />
                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Utca" className="account-input" />
                <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="Házszám" className="account-input" />
                <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="Emelet (nem kötelező)" className="account-input" />
                <input type="text" value={door} onChange={(e) => setDoor(e.target.value)} placeholder="Ajtó (nem kötelező)" className="account-input" />
              </>
            ) : null}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="account-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="account-button save">Mentés</button>
                <button onClick={handleCancel} className="account-button cancel">Mégse</button>
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
