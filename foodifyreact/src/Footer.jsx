import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Foodify. Minden jog fenntartva.</p>
        <ul className="footer-links">
          <li><a href="/privacy-policy">Adatvédelmi irányelvek</a></li>
          <li><a href="/terms-of-service">Felhasználási feltételek</a></li>
          <li><a href="/Kapcsolat">Kapcsolat</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
