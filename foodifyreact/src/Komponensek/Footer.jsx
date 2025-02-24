import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import '../Stilusok/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Rólunk</h2>
          <p>
            Cégünk célja, hogy kiváló minőségű webes megoldásokat kínáljon. Szenvedélyünk a fejlesztés és a digitális innováció.
          </p>
        </div>
        <div className="footer-section">
          <h2>Kapcsolat</h2>
          <p>Email: info@foodify.hu</p>
          <p>Telefon: +36 70 522 6566</p>
          <p>Cím: 3525 Miskolc, Palóczy László utca 3.</p>
        </div>
        <div className="footer-section">
          <h2>Gyorslinkek</h2>
          <ul>
            <li><Link to="/fooldal">Főoldal</Link></li>
            <li><Link to="/kapcsolat">Kapcsolat</Link></li>
            <li><Link to="/iranyelvek">Irányelvek</Link></li>
            <li><Link to="/adatvedelem">Adatvédelem</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Minden jog fenntartva | Foodify</p>
      </div>
    </footer>
  );
};

export default Footer;
