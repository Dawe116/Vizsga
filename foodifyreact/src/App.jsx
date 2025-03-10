import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
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
import { Rendeles } from './Oldalak/Rendeles';
import { TokenHandler } from "./Komponensek/TokenHandler";
import Navbar from "./Komponensek/Navbar";

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <TokenHandler setToken={setToken} setLogged={setLogged} />
      <Navbar token={token} setToken={setToken} logged={logged} setLogged={setLogged} />
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
        <Route path="/Rendeles" element={<Rendeles />} />
        <Route path="/rendeles/:restaurantId" element={<Rendeles />} />
      </Routes>
    </Router>
  );
};
