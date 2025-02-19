import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import '../Stilusok/fooldalstyle.css';
import { FoodifyHome } from "./FoodifyHome";
import { Kosar } from "./Kosar";
import { Kapcsolat } from "./Kapcsolat";
import { HamburgerLista } from "../Kategoriak/HamburgerLista";
import { PizzaLista } from "../Kategoriak/PizzaLista";
import { MagyarLista } from "../Kategoriak/MagyarLista";
import { AmerikaiLista } from "../Kategoriak/AmerikaiLista";
import { OlaszLista } from "../Kategoriak/OlaszLista";
import { GyrosLista } from "../Kategoriak/GyrosLista";
import { AzsiaiLista } from "../Kategoriak/AzsiaiLista";
import { SalatakLista } from "../Kategoriak/SalatakLista";
import { DesszertLista } from "../Kategoriak/DesszertLista";
import { useWindowSize } from '../Komponensek/AblakMeret';
import { Iranyelvek } from '../Oldalak/Iranyelvek';
import { Feltetelek } from '../Oldalak/Feltetelek';

export const App = () => {

  return (
    <Router>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" ><NavLink to="/"><img id="title" src="../img/foodify_logo.jpg" alt="Logónk"/></NavLink></span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <ul id="main">
              <NavLink to="/"> <li>Főoldal</li></NavLink>
                <li>Rólunk</li>
                <li>Fiókom
                  <ul className="drop">
                    <div>
                      <li><span id="openModal">Bejelentkezés</span></li>
                      <li>Regisztráció</li>
                      <li>Elfelejtett jelszó</li>
                      <li>Segítség</li>
                    </div>
                  </ul>
                </li>
                 <li><NavLink to="./Kosar">Kosár</NavLink></li> 
                <li><NavLink to="./Kapcsolat">Kapcsolat</NavLink></li>

                <div id="marker"></div>
            </ul>
            </ul>
          </div>
          </div>
          </nav>
      

          <Routes>
              <Route path="/" element={<FoodifyHome />} />
              <Route path="*" element={<FoodifyHome />} />
              <Route path="/Kosar" element={<Kosar />} />
              <Route path="/Kapcsolat" element={<Kapcsolat />} />
              <Route path="/HamburgerLista" element={<HamburgerLista />} />
              <Route path="/PizzaLista" element={<PizzaLista />} />
              <Route path="/MagyarLista" element={<MagyarLista />} />
              <Route path="/AmerikaiLista" element={<AmerikaiLista />} />
              <Route path="/OlaszLista" element={<OlaszLista />} />
              <Route path="/GyrosLista" element={<GyrosLista />} />
              <Route path="/AzsiaiLista" element={<AzsiaiLista />} />
              <Route path="/SalatakLista" element={<SalatakLista />} />
              <Route path="/DesszertLista" element={<DesszertLista />} />
              <Route path="/Iranyelvek" element={<Iranyelvek />} />
              <Route path="/Feltetelek" element={<Feltetelek />} />
            </Routes>
    </Router>
  );
};

function ResponsiveComponent() {
  const { width } = useWindowSize();

  return (
    <div>
      {width > 768 ? <p>Nagy képernyő</p> : <p>Kis képernyő</p>}
    </div>
  );
}