import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Footer from '../Komponensek/Footer';
import '../Stilusok/fooldalstyle.css';

export const FoodifyHome = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/Restaurant/token")
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError(error.message); // Hibakezelés hozzáadása
      });
  }, []);

  const goToRestaurantsHamburger = () => {
    navigate("/HamburgerLista");
  };
  const goToRestaurantsPizza = () => {
    navigate("/PizzaLista");
  };
  const goToRestaurantsMagyar = () => {
    navigate("/MagyarLista");
  };
  const goToRestaurantsAmerikai = () => {
    navigate("/AmerikaiLista");
  };
  const goToRestaurantsOlasz = () => {
    navigate("/OlaszLista");
  };
  const goToRestaurantsGyros = () => {
    navigate("/GyrosLista");
  };
  const goToRestaurantsAzsiai = () => {
    navigate("/AzsiaiLista");
  };
  const goToRestaurantsSalatak = () => {
    navigate("/SalatakLista");
  };
  const goToRestaurantsDesszert = () => {
    navigate("/DesszertLista");
  };

return (
  <div>
<div>

<div>
      <h1>Foodify Home</h1>
    </div>


        <h1>Konyhatípusok / Főkategóriák</h1>

      <div className="container">
        <div>
          <div className="content">
            <h2 className="kategoria">Hamburger</h2>
            <span className="leiras">Klasszikus és gourmet burgerek szaftos húspogácsával és ízletes feltétekkel</span>
            <button className="btn" onClick={goToRestaurantsHamburger}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Pizza</h2>
            <span className="leiras">Ropogós tészta, olvadó sajt és változatos feltétek olasz stílusban</span>
            <button className="btn" onClick={goToRestaurantsPizza}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Magyar</h2>
            <span className="leiras">Hagyományos magyar ételek gazdag ízekkel és fűszeres fogásokkal</span>
            <button className="btn" onClick={goToRestaurantsMagyar}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Amerikai</h2>
            <span className="leiras">Klasszikus amerikai ételek, mint steak, BBQ és sült krumpli</span>
            <button className="btn" onClick={goToRestaurantsAmerikai}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Olasz</h2>
            <span className="leiras">Tészták, pizzák és mediterrán ízek friss alapanyagokkal</span>
            <button className="btn" onClick={goToRestaurantsOlasz}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Gyros</h2>
            <span className="leiras">Fűszeres, grillezett hús pitában vagy tálon, friss zöldségekkel és ízletes öntetekkel</span>
            <button className="btn" onClick={goToRestaurantsGyros}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Ázsiai</h2>
            <span className="leiras">Keleti ízek, wok ételek, sushi és fűszeres specialitások</span>
            <button className="btn" onClick={goToRestaurantsAzsiai}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Saláták</h2>
            <span className="leiras">Friss, könnyed és egészséges zöldséges fogások</span>
            <button className="btn" onClick={goToRestaurantsSalatak}>Megtekintés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Desszert</h2>
            <span className="leiras">Édes finomságok, sütemények, fagylaltok és krémes édességek</span>
            <button className="btn" onClick={goToRestaurantsDesszert}>Megtekintés</button>
          </div>
        </div>
      </div>
    </div>



  <h1 className="etterem">Összes étterem</h1>

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
</div>
);
}