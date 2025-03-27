import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Stilusok/Ettermek.css';
import Footer from '../Komponensek/Footer';

export const SalatakLista = ({ searchTerm }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]); 
  
    useEffect(() => {
      axios.get("https://localhost:5000/api/Restaurant/category/Saláták")
        .then(response => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Hiba történt:", error);
          setError(error.message);
        });
    }, []);

    const filteredData = data.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div id="root">
      <h1>Saláták éttermek</h1>
      <div className="page-content">
      {error && <p className="error-message">{error}</p>}
      {data.length === 0 && !error && <p>Nincs elérhető étterem.</p>}
      {filteredData.length === 0 && !error && <p>Nincs találat a keresésre.</p>}
          {filteredData.map((restaurant) => (
    <div 
      key={restaurant.name} 
      className="restaurant-card" 
      style={{ 
        backgroundImage: `url(data:image/png;base64,${restaurant.logo})`, 
      }}>
      <div className="content_etterem">
        <h2 className="restaurant-title">{restaurant.name}</h2>
        <p className="restaurant-description">{restaurant.description}</p>
        <Link to={`/rendeles/${restaurant.id}`}><button className="order-btn">Rendelés</button></Link>
      </div>
    </div>
  ))}
    </div>
    <Footer />
    </div>
    );
};