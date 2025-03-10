import React from "react";
import { Link } from "react-router-dom";
import '../Stilusok/FoodifyHome.css';
import Footer from '../Komponensek/Footer';

export const FoodifyHome = () => {

return (
<div id="root">
        <h1>Konyhatípusok / Főkategóriák</h1>
      <div className="category-container">
        <div className="category-card">
        <Link to="/hamburgerlista"><div className="category-content">
            <h2 className="kategoria">Hamburger</h2>
            <span className="leiras">Klasszikus és gourmet burgerek szaftos húspogácsával és ízletes feltétekkel</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/pizzalista"><div className="category-content">
            <h2 className="kategoria">Pizza</h2>
            <span className="leiras">Ropogós tészta, olvadó sajt és változatos feltétek olasz stílusban</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/magyarlista"><div className="category-content">
            <h2 className="kategoria">Magyar</h2>
            <span className="leiras">Hagyományos magyar ételek gazdag ízekkel és fűszeres fogásokkal</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/amerikailista"><div className="category-content">
            <h2 className="kategoria">Amerikai</h2>
            <span className="leiras">Klasszikus amerikai ételek, mint steak, BBQ és sült krumpli</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/olaszlista"><div className="category-content">
            <h2 className="kategoria">Olasz</h2>
            <span className="leiras">Tészták, pizzák és mediterrán ízek friss alapanyagokkal</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/gyroslista"><div className="category-content">
            <h2 className="kategoria">Gyros</h2>
            <span className="leiras">Fűszeres, grillezett hús pitában vagy tálon, friss zöldségekkel és ízletes öntetekkel</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/azsiailista"><div className="category-content">
            <h2 className="kategoria">Ázsiai</h2>
            <span className="leiras">Keleti ízek, wok ételek, sushi és fűszeres specialitások</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/salataklista"><div className="category-content">
            <h2 className="kategoria">Saláták</h2>
            <span className="leiras">Friss, könnyed és egészséges zöldséges fogások</span>
          </div></Link>
        </div>
        <div className="category-card">
        <Link to="/desszertlista"><div className="category-content">
            <h2 className="kategoria">Desszert</h2>
            <span className="leiras">Édes finomságok, sütemények, fagylaltok és krémes édességek</span>
          </div></Link>
        </div>
      </div>
      <Footer />
</div>
);
}