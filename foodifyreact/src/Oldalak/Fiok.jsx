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
  const token = localStorage.getItem("token");

  const storedCimek = localStorage.getItem("cimek");
  const [cimek, setCimek] = useState(storedCimek ? JSON.parse(storedCimek) : []);

  if (!Array.isArray(cimek)) {
    setCimek([]);
  }

  useEffect(() => {
    axios.get("https://localhost:5000/api/County")
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setCounties(response.data);
        }
      })
      .catch(error => {
        setError("Hiba történt a megyék lekérésekor.");
      });

    axios.get(`https://localhost:5000/api/Address/${adatok.id}`)
      .then(response => {
        setData(response.data);
        setCimek(response.data);
        localStorage.setItem("cimek", JSON.stringify(response.data));
        setFormData({
          county: response.data.countyId || "",
          postalCode: response.data.postalCode || "",
          city: response.data.city || "",
          street: response.data.street || "",
          houseNumber: response.data.houseNumber || "",
          floor: response.data.floor || "",
          door: response.data.door || ""
        });
      })
      .catch(error => {
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
    const token = localStorage.getItem("token");
  
    axios.post(`https://localhost:5000/api/Address/${token}`, {
      userId: adatok.id,
      countyId: formData.county,
      postalCode: formData.postalCode,
      city: formData.city,
      street: formData.street,
      houseNumber: formData.houseNumber,
      floor: formData.floor || null,
      door: formData.door || null
    })
    .then(response => {
      setCimek(prev => [...prev, response.data]);
      localStorage.setItem("cimek", JSON.stringify([...cimek, response.data]));
      setIsEditing(false);
      setOriginalData(formData);
    })
    .catch(error => {
      console.error("Hiba történt a mentés során:", error.response?.data || error.message);
      setErrorMessage("Hiba történt a mentés során.");
    });
  };
  
  const handleUpdate = () => {
    if (!formData.county || !formData.postalCode || !formData.city || !formData.street || !formData.houseNumber) {
      setErrorMessage("Minden kötelező mezőt ki kell tölteni!");
      return;
    }
  
    setErrorMessage("");
    const token = localStorage.getItem("token");
  
    axios.put(`https://localhost:5000/api/Address/${token}`, {
      id: data.id,
      userId: adatok.id,
      countyId: formData.county,
      postalCode: formData.postalCode,
      city: formData.city,
      street: formData.street,
      houseNumber: formData.houseNumber,
      floor: formData.floor || null,
      door: formData.door || null
    })
    .then(response => {
      console.log("Cím sikeresen frissítve:", response.data);
      setCimek(prev => prev.map(item => (item.id === data.id ? response.data : item)));
      localStorage.setItem("cimek", JSON.stringify(cimek));
      setIsEditing(false);
    })
    .catch(error => {
      console.error("Hiba történt a frissítés során:", error.response?.data || error.message);
      setErrorMessage("Hiba történt a frissítés során.");
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
            <p><strong>Teljes név: {adatok.name}</strong></p>
            <p><strong>Email: {adatok.email}</strong></p>
          </div>
          <div className="account-address">
            <label className="address-label"><strong>Lakcím:</strong> </label>
            <select name="county" className="megye-lista" value={formData.county || ""} onChange={handleChange} disabled={!isEditing}>
              <option value="">Válassz megyét</option>
              {counties.map(county => (
                <option key={county.id} value={county.id}>{county.name}</option>
              ))}
            </select>
            {Object.keys(formData).filter(key => key !== "county").map((key) => (
              <input key={key} type="text" name={key} value={formData[key] || ""} onChange={handleChange} className="account-input" disabled={!isEditing} 
              placeholder={ key === "postalCode" ? "Irányítószám" : key === "city" ? "Város" : key === "street" ? "Utca" : key === "houseNumber" ? "Házszám" : key === "floor" ? "Emelet (nem kötelező)" : key === "door" ? "Ajtó (nem kötelező)" : key } />
            ))}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
           <div className="account-buttons">
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="account-button update">Mentés</button>
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