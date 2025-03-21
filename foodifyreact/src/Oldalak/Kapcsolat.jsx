import React, { useState } from 'react';
import '../Stilusok/Kapcsolat.css';
import Footer from '../Komponensek/Footer';
import ContactModal from '../Komponensek/ContactModal';

export const Kapcsolat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="root">
      <div className="auth-container">
      <h1>Kapcsolat</h1>
      <h4>Ügyfélszolgálat</h4>
      <h4><i>Minden nap 0/24</i></h4>
      <h4>E-mail: foodifyhelp@gmail.com</h4>
      <h4>Telefon: +36 70 123 4567</h4>
      <button type="button" className="contact-btn" onClick={openModal}>Ügyfélszolgálat</button>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      <Footer />
    </div>
  );
};
