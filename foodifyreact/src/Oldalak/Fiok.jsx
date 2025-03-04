import React, { useState } from "react";
import axios from "axios";
import "../Stilusok/Fiok.css";
import Footer from '../Komponensek/Footer';

export const Fiok = ({ userData }) => {
    const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log("Address saved:", address);
    setIsEditing(false);
  };

  return (
    <div className="account-page-container">
      <div className="account-card">
        <div className="account-card-header">
          <h2>Saját Fiók</h2>
        </div>
        <div className="account-card-content">
          <div className="account-info">
            <p><strong>Felhasználónév:</strong> {userData.username}</p>
            <p><strong>Teljes név:</strong> {userData.fullName}</p>
          </div>
          <div className="account-address">
            <label>Lakcím</label>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Add meg a lakcímedet..."
                className="account-input"
              />
            ) : (
              <p>{address || "Nincs megadva"}</p>
            )}
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
