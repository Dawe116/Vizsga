import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Stilusok/Ettermek.css';
import Footer from '../Komponensek/Footer';

export const PizzaLista = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]); 
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/Restaurant/category/Pizza")
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
      {data.length === 0 && !error && <p>Nincs elérhető étterem.</p>}
      {data.map((restaurant) => (
    <div 
      key={restaurant.name} 
      className="card" 
      style={{ 
        backgroundImage: `url(data:image/png;base64,${restaurant.logo})`, 
      }}>
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
