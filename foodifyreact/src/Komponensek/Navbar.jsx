import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../Stilusok/Navbar.css";

const Navbar = ({ token, setToken, logged, setLogged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="../img/foodify_logo.jpg" alt="Foodify Logo" />
        </Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Főoldal</Link></li>
          <li><Link to="/Kosar" onClick={() => setMenuOpen(false)}>Kosár</Link></li>
          <li><Link to="/Kapcsolat" onClick={() => setMenuOpen(false)}>Kapcsolat</Link></li>
          <li className="dropdown">
            Fiókom
            <ul className="dropdown-menu">
            <div>
                    {logged ? (
                      <>
                        <li><Link to="/Fiok" onClick={() => setMenuOpen(false)}>Saját fiók</Link></li>
                        <li onClick={() => {
                          localStorage.removeItem("token");
                          setToken("");
                          setLogged(false);
                          window.location.reload();
                        }}>Kijelentkezés</li>
                      </>
                    ) : (
                      <>
                        <li><Link to="/Bejelentkezes" onClick={() => setMenuOpen(false)}>Bejelentkezés</Link></li>
                        <li><Link to="/Regisztracio" onClick={() => setMenuOpen(false)}>Regisztráció</Link></li>
                        <li><Link to="/Elfelejtett"  onClick={() => setMenuOpen(false)}>Elfelejtett jelszó</Link></li>
                      </>
                    )}
                  </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;