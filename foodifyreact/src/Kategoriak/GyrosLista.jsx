import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Stilusok/Ettermek.css';
import Footer from '../Komponensek/Footer';

export const GyrosLista = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]); 
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/Restaurant")
        .then(response => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Hiba történt:", error);
          setError(error.message); // Hibakezelés hozzáadása
        });
    }, []);

  return (
    <div>
    <div className="page-content">
    {error && <p className="error-message">{error}</p>}
    {data.length === 0 && !error && <p>Nincs elérhető étterem.</p>} {/* Üres állapot kezelése */}
    {data.map((restaurant) => (
      <div key={restaurant.name} className="card"> {/* Helyes key attribútum */}
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
  <Footer />
  </div>
  );
};
