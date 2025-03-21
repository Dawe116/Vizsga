import React, { useState } from 'react';
import '../Stilusok/ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback('');

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setFeedback('Az üzenet sikeresen elküldve!');
        setMessage('');
        setTimeout(() => {
          setFeedback('');
          onClose();
        }, 2000);
      } else {
        setFeedback('Hiba történt az üzenet küldésekor.');
      }
    } catch (error) {
      setFeedback('Hálózati hiba történt.');
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setMessage('');
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
            style={{ resize: 'none' }}
          />
          <div>
            <button type="submit" className="contact-submit-btn" disabled={isSending}>
              {isSending ? 'Küldés...' : 'Küldés'}
            </button>
            <button type="button" className="close-btn" onClick={handleClose} disabled={isSending}>
              Mégse
            </button>
          </div>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default ContactModal;