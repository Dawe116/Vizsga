import React, { useState } from 'react';
import '../Stilusok/ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Üzenet küldve:", message);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Írjon üzenetet</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Írja meg üzenetét..."
            rows="4"
            required
          />
          <div>
            <button type="submit" className="submit-btn">Küldés</button>
            <button type="button" className="close-btn" onClick={onClose}>Mégse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;