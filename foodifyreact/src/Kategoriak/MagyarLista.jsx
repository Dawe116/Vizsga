import React, { useState, useEffect } from "react";
import axios from "axios";
import './Ettermek.css';

export const MagyarLista = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost/phpmyadmin/index.php?route=/database/structure&db=foodorder", {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        setRestaurants(response.data);
      } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
        setError("Nem sikerült betölteni az éttermeket. Kérlek, próbáld újra később.");
      }
    };
    
    fetchRestaurants();
  }, []);

  return (
    <div className="page-content">
      {error && <p className="error-message">{error}</p>}
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${restaurant.image})` }}
          ></div>
          <div className="content_etterem">
            <h2 className="title">{restaurant.name}</h2>
            <p className="copy">{restaurant.description}</p>
            <button className="btn">Rendelés</button>
          </div>
        </div>
      ))}
    </div>
  );
};