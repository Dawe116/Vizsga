import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import './fooldalstyle.css';

export const FoodifyHome = () => {
  const navigate = useNavigate();

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
        <h1>Konyhatípusok / Főkategóriák</h1>

      <div className="container">
        <div>
          <div className="content">
            <h2 className="kategoria">Hamburger</h2>
            <span className="leiras">Klasszikus és gourmet burgerek szaftos húspogácsával és ízletes feltétekkel</span>
            <button className="btn" onClick={goToRestaurantsHamburger}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Pizza</h2>
            <span className="leiras">Ropogós tészta, olvadó sajt és változatos feltétek olasz stílusban</span>
            <button className="btn" onClick={goToRestaurantsPizza}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Magyar</h2>
            <span className="leiras">Hagyományos magyar ételek gazdag ízekkel és fűszeres fogásokkal</span>
            <button className="btn" onClick={goToRestaurantsMagyar}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Amerikai</h2>
            <span className="leiras">Klasszikus amerikai ételek, mint steak, BBQ és sült krumpli</span>
            <button className="btn" onClick={goToRestaurantsAmerikai}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Olasz</h2>
            <span className="leiras">Tészták, pizzák és mediterrán ízek friss alapanyagokkal</span>
            <button className="btn" onClick={goToRestaurantsOlasz}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Gyros</h2>
            <span className="leiras">Fűszeres, grillezett hús pitában vagy tálon, friss zöldségekkel és ízletes öntetekkel</span>
            <button className="btn" onClick={goToRestaurantsGyros}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Ázsiai</h2>
            <span className="leiras">Keleti ízek, wok ételek, sushi és fűszeres specialitások</span>
            <button className="btn" onClick={goToRestaurantsAzsiai}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Saláták</h2>
            <span className="leiras">Friss, könnyed és egészséges zöldséges fogások</span>
            <button className="btn" onClick={goToRestaurantsSalatak}>Rendelés</button>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Desszert</h2>
            <span className="leiras">Édes finomságok, sütemények, fagylaltok és krémes édességek</span>
            <button className="btn" onClick={goToRestaurantsDesszert}>Rendelés</button>
          </div>
        </div>
      </div>
    </div>



  <h1 className="etterem">Összes étterem</h1>

  <div className="page-content">
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">McDonald's®</h2>
      <p className="copy">I'm lovin' it</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">BURGER KING®</h2>
      <p className="copy">Pont, ahogy szereted!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">KFC</h2>
      <p className="copy">A frissen készült étel a legfinomabb.</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">Pizza Hut</h2>
      <p className="copy">No One Outpizzas the Hut!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">McDonald's®</h2>
      <p className="copy">I'm lovin' it</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">BURGER KING®</h2>
      <p className="copy">Pont, ahogy szereted!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">KFC</h2>
      <p className="copy">A frissen készült étel a legfinomabb.</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">Pizza Hut</h2>
      <p className="copy">No One Outpizzas the Hut!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">McDonald's®</h2>
      <p className="copy">I'm lovin' it</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">BURGER KING®</h2>
      <p className="copy">Pont, ahogy szereted!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">KFC</h2>
      <p className="copy">A frissen készült étel a legfinomabb.</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  <div className="card">
    <div className="content_etterem">
      <h2 className="title">Pizza Hut</h2>
      <p className="copy">No One Outpizzas the Hut!</p>
      <button className="btn">Rendelés</button>
    </div>
  </div>
  </div>
</div>
);
}