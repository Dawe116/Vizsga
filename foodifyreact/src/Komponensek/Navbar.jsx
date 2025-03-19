import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import "../Stilusok/Navbar.css";

const Navbar = ({ token, setToken, logged, setLogged, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const isSearchActive = location.pathname.includes("/Ettermek") || location.pathname.includes("/hamburgerlista")|| location.pathname.includes("/pizzalista")|| location.pathname.includes("/magyarlista")|| location.pathname.includes("/amerikailista")|| location.pathname.includes("/olaszlista")|| location.pathname.includes("/gyroslista")|| location.pathname.includes("/azsiailista")|| location.pathname.includes("/salataklista") || location.pathname.includes("/desszertlista");
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
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
          <li><Link to="/Ettermek" onClick={() => setMenuOpen(false)}>Összes étterem</Link></li>
          <li><Link to="/Kapcsolat" onClick={() => setMenuOpen(false)}>Kapcsolat</Link></li>

          <li className="dropdown">
            <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Fiókom <ChevronDown size={16} className={`dropdown-icon ${dropdownOpen ? "open" : ""}`} />
            </div>
            <ul className={`dropdown-menu ${dropdownOpen ? "active" : ""}`}>
              {logged ? (
                <>
                  <li><Link to="/Fiok" onClick={() => setMenuOpen(false)}>Saját fiók</Link></li>
                  <li><Link to="/Kosar" onClick={() => setMenuOpen(false)}>Kosaram</Link></li>
                  <li onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    setLogged(false);
                    window.location.reload();
                  }}><Link to="/FoodifyHome" onClick={() => setMenuOpen(false)}>Kijelentkezés</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/Bejelentkezes" onClick={() => setMenuOpen(false)}>Bejelentkezés</Link></li>
                  <li><Link to="/Regisztracio" onClick={() => setMenuOpen(false)}>Regisztráció</Link></li>
                  <li><Link to="/Elfelejtett" onClick={() => setMenuOpen(false)}>Elfelejtett jelszó</Link></li>
                </>
              )}
            </ul>
          </li>
        </ul>

        {isSearchActive && (
          <div className="search-container">
            <input
            type="text"
            className="search-bar"
            placeholder="Keresés..."
            value={searchTerm}
            onChange={handleInputChange}
            />
            <Search size={20} className="search-icon" />
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;