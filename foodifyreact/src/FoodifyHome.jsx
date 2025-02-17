import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './fooldalstyle.css';
import { Footer } from "./Footer";

export const FoodifyHome = () => {


return (
  <div>
<div>
    <div>
        <h1>Konyhatípusok / Főkategóriák</h1>

      <div className="container">
        <div>
          <div className="content">
            <h2 className="kategoria">Hamburger</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Pizza</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Magyar</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Amerikai</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Olasz</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Gyros</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Ázsiai</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Saláták</h2>
            <span className="leiras">Leírás</span>
          </div>
        </div>
        <div>
          <div className="content">
            <h2 className="kategoria">Desszert</h2>
            <span className="leiras">Leírás</span>
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
<Footer />
</div>
);
}