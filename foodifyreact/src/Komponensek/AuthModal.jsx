import React from "react";
import { Link } from "react-router-dom";
import "../Stilusok/AuthModal.css";

const AuthModal = ({ message, isSuccess, onClose, onRetry, successRedirect }) => {
  return (
    <div className="auth-modal">
      <div className="modal-content">
        <h2>{isSuccess ? "Sikeres művelet" : "Hiba történt"}</h2>
        <p>{message}</p>
        {isSuccess ? (
          <Link to={successRedirect}>
            <button className="success-btn" onClick={onClose}>Tovább</button>
          </Link>
        ) : (
          <button className="retry-btn" onClick={onRetry}>Újrapróbálkozás</button>
        )}
      </div>
    </div>
  );
};

export default AuthModal;