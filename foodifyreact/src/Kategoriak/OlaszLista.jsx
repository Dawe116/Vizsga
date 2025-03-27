import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Stilusok/Ettermek.css';
import Footer from '../Komponensek/Footer';

export const OlaszLista = ({ searchTerm }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true) 
  
    useEffect(() => {
      setLoading(true);
      setError(null);
      const timeout = setTimeout(() => {
        if (loading) {
          setError("Hálózati hiba: Az adatok betöltése túl sokáig tart.");
          setLoading(false);
        }
      }, 30000);
  
      axios.get("https://localhost:5000/api/Restaurant/category/Pizza")
        .then(response => {
          setData(response.data);
          console.log(response.data);
          clearTimeout(timeout);
        })
        .catch(error => {
          console.error("Hiba történt:", error);
          setError("Hálózati vagy szerverhiba: Az adatok nem érhetők el.");
          clearTimeout(timeout);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    const filteredData = data.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div id="root">
      <h1>Olasz éttermek</h1>
      <div className="page-content">
              {loading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Betöltés...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <p className="error-message">{error}</p>
                </div>
              ) : filteredData.length === 0 ? (
                <p>Nincs találat a keresésre.</p>
              ) : (
                filteredData.map((restaurant) => (
                  <div 
                    key={restaurant.id} 
                    className="restaurant-card" 
                    style={{ 
                      backgroundImage: `url(data:image/png;base64,${restaurant.logo})`, 
                    }}>
                    <div className="content_etterem">
                      <h2 className="restaurant-title">{restaurant.name}</h2>
                      <p className="restaurant-description">{restaurant.description}</p>
                      <Link to={`/rendeles/${restaurant.id}`}>
                        <button className="order-btn">Rendelés</button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
    <Footer />
    </div>
    );
};