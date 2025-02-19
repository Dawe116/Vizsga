import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink} from "react-router-dom";
import '../Stilusok/Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Foodify. Minden jog fenntartva.</p>
        <ul className="footer-links">
          <li><a href="/Iranyelvek">Adatvédelmi irányelvek</a></li>
          <li><a href="/Feltetelek">Felhasználási feltételek</a></li>
          <li><a href="/Kapcsolat">Kapcsolat</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;