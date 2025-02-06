import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './fooldalstyle.css';

export const FoodifyHome = () => {


return (
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



<h1 class="etterem">Összes étterem</h1>

<div class="page-content">
  <div class="card">
    <div class="content_etterem">
      <h2 class="title">McDonald's®</h2>
      <p class="copy">I'm lovin' it</p>
      <button class="btn">Rendelés</button>
    </div>
  </div>
  <div class="card">
    <div class="content_etterem">
      <h2 class="title">BURGER KING®</h2>
      <p class="copy">Pont, ahogy szereted!</p>
      <button class="btn">Rendelés</button>
    </div>
  </div>
  <div class="card">
    <div class="content_etterem">
      <h2 class="title">KFC</h2>
      <p class="copy">A frissen készült étel a legfinomabb.</p>
      <button class="btn">Rendelés</button>
    </div>
  </div>
  <div class="card">
    <div class="content_etterem">
      <h2 class="title">Pizza Hut</h2>
      <p class="copy">No One Outpizzas the Hut!</p>
      <button class="btn">Rendelés</button>
    </div>
  </div>
</div>
</div>
    );
}
