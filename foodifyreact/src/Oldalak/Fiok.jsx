import React, { useState, useEffect } from "react";
import "../Stilusok/Fiok.css";
import axios from "axios";
import Footer from '../Komponensek/Footer';

export const Fiok = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [counties, setCounties] = useState([]);
  const [formData, setFormData] = useState({
    county: "",
    postalCode: "",
    city: "",
    street: "",
    houseNumber: "",
    floor: "",
    door: ""
  });
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [adatok] = useState(JSON.parse(localStorage.getItem("adatok")));
  const [errorMessage, setErrorMessage] = useState("");

  const storedCimek = localStorage.getItem("cimek");
  const [cimek, setCimek] = useState(storedCimek ? JSON.parse(storedCimek) : []);

  useEffect(() => {
    axios.get("https://localhost:5000/api/County")
      .then(response => {
        console.log("Megye lista:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setCounties(response.data);
        } else {
          console.error("Hibás adatformátum az API-tól");
        }
      })
      .catch(error => {
        console.error("Hiba a megyék lekérésekor:", error.response?.status, error.message);
        setError("Hiba történt a megyék lekérésekor.");
      });

    axios.get("https://localhost:5000/api/Address")
      .then(response => {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          const address = response.data[0];
          setData(response.data);
          setCimek(response.data);
          localStorage.setItem("cimek", JSON.stringify(response.data));

          setFormData({
            county: address.countyId || "",
            postalCode: address.postalCode || "",
            city: address.city || "",
            street: address.street || "",
            houseNumber: address.houseNumber || "",
            floor: address.floor || "",
            door: address.door || ""
          });
          setOriginalData(address);
        }
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError("Hiba történt az adatok lekérésekor.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.county || !formData.postalCode || !formData.city || !formData.street || !formData.houseNumber) {
      setErrorMessage("Minden kötelező mezőt ki kell tölteni!");
      return;
    }

    setErrorMessage("");
    axios.put("https://localhost:5000/api/Address", formData)
      .then(response => {
        setCimek(prev => 
          prev.map(item => item.id === response.data.id ? response.data : item)
        );
        localStorage.setItem("cimek", JSON.stringify(cimek));

        setIsEditing(false);
        setOriginalData(response.data);  // Az új adatokat tároljuk itt
      })
      .catch(error => {
        console.error("Hiba történt a mentés során:", error);
        setErrorMessage("Hiba történt a mentés során.");
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage("");
    setFormData({
      county: originalData.countyId || "",
      postalCode: originalData.postalCode || "",
      city: originalData.city || "",
      street: originalData.street || "",
      houseNumber: originalData.houseNumber || "",
      floor: originalData.floor || "",
      door: originalData.door || ""
    });
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
            <label className="address-label"><strong>Szállítási cím:</strong> {cimek.length === 0 ? "Nincs megadva" : ""}</label>
            <select
              name="county" className="megye-lista"
              value={formData.county || ""}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Válassz megyét</option>
              {counties.map((county) => (
                <option key={county.id} value={county.id}>{county.name}</option>
              ))}
            </select>
            {Object.keys(formData).filter(key => key !== "county").map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                placeholder={ 
                  key === "postalCode" ? "Irányítószám" :
                  key === "city" ? "Település" :
                  key === "street" ? "Utca" :
                  key === "houseNumber" ? "Házszám" :
                  key === "floor" ? "Emelet (nem kötelező)" :
                  key === "door" ? "Ajtó (nem kötelező)" : key
                }
                className="account-input"
                disabled={!isEditing}
              />
            ))}
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