import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { Ettermek } from './Oldalak/Ettermek';
import { TokenHandler } from "./Komponensek/TokenHandler";
import Navbar from "./Komponensek/Navbar";
import { KosarProvider } from "./Komponensek/KosarTartalom";

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);  

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, 5) }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  useEffect(() => {
    setSearchTerm("");
  }, [window.location.pathname]);

  return (
    <KosarProvider>
    <Router>
      <TokenHandler setToken={setToken} setLogged={setLogged} />
      <Navbar token={token} setToken={setToken} logged={logged} setLogged={setLogged} onSearch={handleSearch} searchTerm={searchTerm} />
      <Routes>
        <Route path="/" element={<FoodifyHome />} />
        <Route path="*" element={<FoodifyHome />} />
        <Route path="/FoodifyHome" element={<FoodifyHome />} />
        <Route path="/Kosar" element={<Kosar cartItems={cartItems} />} />
        <Route path="/Kapcsolat" element={<Kapcsolat />} />
        <Route path="/HamburgerLista" element={<HamburgerLista searchTerm={searchTerm}/>} />
        <Route path="/PizzaLista" element={<PizzaLista searchTerm={searchTerm}/>} />
        <Route path="/MagyarLista" element={<MagyarLista searchTerm={searchTerm}/>} />
        <Route path="/AmerikaiLista" element={<AmerikaiLista searchTerm={searchTerm}/>} />
        <Route path="/OlaszLista" element={<OlaszLista searchTerm={searchTerm}/>} />
        <Route path="/GyrosLista" element={<GyrosLista searchTerm={searchTerm}/>} />
        <Route path="/AzsiaiLista" element={<AzsiaiLista searchTerm={searchTerm}/>} />
        <Route path="/SalatakLista" element={<SalatakLista searchTerm={searchTerm}/>} />
        <Route path="/DesszertLista" element={<DesszertLista searchTerm={searchTerm}/>} />
        <Route path="/Iranyelvek" element={<Iranyelvek />} />
        <Route path="/Feltetelek" element={<Feltetelek />} />
        <Route path="/Bejelentkezes" element={<Bejelentkezes />} />
        <Route path="/Regisztracio" element={<Regisztracio />} />
        <Route path="/Elfelejtett" element={<Elfelejtett />} />
        <Route path="/Fiok" element={<Fiok />} />
        <Route path="/Rendeles" element={<Rendeles searchTerm={searchTerm} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path="/rendeles/:restaurantId" element={<Rendeles searchTerm={searchTerm} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path="/Ettermek" element={<Ettermek searchTerm={searchTerm}/>} />
      </Routes>
    </Router>
    </KosarProvider>
  );
};
