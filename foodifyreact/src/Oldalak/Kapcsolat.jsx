import React, { useState } from 'react';
import '../Stilusok/Kapcsolat.css';
import Footer from '../Komponensek/Footer';
import ContactModal from '../Komponensek/ContactModal';

export const Kapcsolat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      alert('Üzenet elküldve!');
      setMessage('');
      closeModal();
    } else {
      alert('Hiba történt az üzenet küldésekor.');
    }
  };

  return (
    <div id="root">
      <div className="contact-container">
        <h1>Kapcsolat</h1>
        <h4>Ügyfélszolgálat</h4>
        <h4><i>Minden nap 0/24</i></h4>
        <h4>E-mail: foodifyhelp@gmail.com</h4>
        <h4>Telefon: +36 70 123 4567</h4>
        <button type="button" className="contact-btn" onClick={openModal}>Ügyfélszolgálat</button>
      </div>
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
};