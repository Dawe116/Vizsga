import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import Footer from '../Komponensek/Footer';
import '../Stilusok/fooldalstyle.css';

export const FoodifyHome = () => {
return (
<div>
<div>
<div>
    </div>
        <h1>Konyhatípusok / Főkategóriák</h1>

      <div className="category-container">
        <div>
        <Link to="/hamburgerlista"><div className="content">
            <h2 className="kategoria">Hamburger</h2>
            <span className="leiras">Klasszikus és gourmet burgerek szaftos húspogácsával és ízletes feltétekkel</span>
          </div></Link>
        </div>
        <div>
        <Link to="/pizzalista"><div className="content">
            <h2 className="kategoria">Pizza</h2>
            <span className="leiras">Ropogós tészta, olvadó sajt és változatos feltétek olasz stílusban</span>
          </div></Link>
        </div>
        <div>
        <Link to="/magyarlista"><div className="content">
            <h2 className="kategoria">Magyar</h2>
            <span className="leiras">Hagyományos magyar ételek gazdag ízekkel és fűszeres fogásokkal</span>
          </div></Link>
        </div>
        <div>
        <Link to="/amerikailista"><div className="content">
            <h2 className="kategoria">Amerikai</h2>
            <span className="leiras">Klasszikus amerikai ételek, mint steak, BBQ és sült krumpli</span>
          </div></Link>
        </div>
        <div>
        <Link to="/olaszlista"><div className="content">
            <h2 className="kategoria">Olasz</h2>
            <span className="leiras">Tészták, pizzák és mediterrán ízek friss alapanyagokkal</span>
          </div></Link>
        </div>
        <div>
        <Link to="/gyroslista"><div className="content">
            <h2 className="kategoria">Gyros</h2>
            <span className="leiras">Fűszeres, grillezett hús pitában vagy tálon, friss zöldségekkel és ízletes öntetekkel</span>
          </div></Link>
        </div>
        <div>
        <Link to="/azsiailista"><div className="content">
            <h2 className="kategoria">Ázsiai</h2>
            <span className="leiras">Keleti ízek, wok ételek, sushi és fűszeres specialitások</span>
          </div></Link>
        </div>
        <div>
        <Link to="/salataklista"><div className="content">
            <h2 className="kategoria">Saláták</h2>
            <span className="leiras">Friss, könnyed és egészséges zöldséges fogások</span>
          </div></Link>
        </div>
        <div>
        <Link to="/desszertlista"><div className="content">
            <h2 className="kategoria">Desszert</h2>
            <span className="leiras">Édes finomságok, sütemények, fagylaltok és krémes édességek</span>
          </div></Link>
        </div>
      </div>
    </div>
  <Footer />
</div>
);
}