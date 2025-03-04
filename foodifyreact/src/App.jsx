import React ,{useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import './Stilusok/fooldalstyle.css';
import { FoodifyHome } from "./Oldalak/FoodifyHome";
import { Kosar } from "./Oldalak/Kosar";
import { Kapcsolat } from "./Oldalak/Kapcsolat";
import { HamburgerLista } from "./Kategoriak/HamburgerLista";
import { PizzaLista } from "./Kategoriak/PizzaLista";
import { MagyarLista } from "./Kategoriak/MagyarLista";
import { AmerikaiLista } from "./Kategoriak/AmerikaiLista";
import { OlaszLista } from "./Kategoriak/OlaszLista";
import { GyrosLista } from "./Kategoriak/GyrosLista";
import { AzsiaiLista } from "./Kategoriak/AzsiaiLista";
import { SalatakLista } from "./Kategoriak/SalatakLista";
import { DesszertLista } from "./Kategoriak/DesszertLista";
import { Iranyelvek } from './Oldalak/Iranyelvek';
import { Feltetelek } from './Oldalak/Feltetelek';
import { Bejelentkezes } from './Oldalak/Bejelentkezes';
import { Regisztracio } from './Oldalak/Regisztracio';
import { Elfelejtett } from './Oldalak/Elfelejtett';
import { Fiok } from './Oldalak/Fiok';
import { TokenHandler } from "./Komponensek/TokenHandler";


export const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <TokenHandler setToken={setToken} setLogged={setLogged} /> {/* Ez figyeli az URL változásokat */}

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <NavLink to="/"><img id="title" src="../img/foodify_logo.jpg" alt="Logónk" /></NavLink>
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <ul id="main">
                <NavLink to="/"> <li>Főoldal</li></NavLink>
                <li>Rólunk</li>
                <li>Fiókom
                  <ul className="drop">
                    <div>
                      {logged ? (
                        <>
                          <li><NavLink to="/Fiok">Saját fiók</NavLink></li>
                          <li onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                          }}>Kijelentkezés</li>
                        </>
                      ) : (
                        <>
                          <li><NavLink to="/Bejelentkezes">Bejelentkezés</NavLink></li>
                          <li><NavLink to="/Regisztracio">Regisztráció</NavLink></li>
                          <li><NavLink to="/Elfelejtett">Elfelejtett jelszó</NavLink></li>
                        </>
                      )}
                    </div>
                  </ul>
                </li>
                <li><NavLink to="/Kosar">Kosár</NavLink></li> 
                <li><NavLink to="/Kapcsolat">Kapcsolat</NavLink></li>
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
        <Route path="/Bejelentkezes" element={<Bejelentkezes />} />
        <Route path="/Regisztracio" element={<Regisztracio />} />
        <Route path="/Elfelejtett" element={<Elfelejtett />} />
        <Route path="/Fiok" element={<Fiok />} />
      </Routes>
    </Router>
  );
};