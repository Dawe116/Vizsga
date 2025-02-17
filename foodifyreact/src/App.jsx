import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import './fooldalstyle.css';
import { FoodifyHome } from "./FoodifyHome";
import { Kosar } from "./Kosar";
import { Kapcsolat } from "./Kapcsolat";
import { HamburgerLista } from "./HamburgerLista";
import { PizzaLista } from "./PizzaLista";
import { MagyarLista } from "./MagyarLista";
import { AmerikaiLista } from "./AmerikaiLista";
import { OlaszLista } from "./OlaszLista";
import { GyrosLista } from "./GyrosLista";
import { AzsiaiLista } from "./AzsiaiLista";
import { SalatakLista } from "./SalatakLista";
import { DesszertLista } from "./DesszertLista";
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
            </Routes>
    </Router>
  );
};