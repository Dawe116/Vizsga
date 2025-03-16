import React from 'react';
import '../Stilusok/Kapcsolat.css';
import Footer from '../Komponensek/Footer';

export const Kapcsolat = () => {
    return (
        <div id="root">
            <h2>Kapcsolat</h2>
            <h4>Ügyfélszolgálat</h4>
            <h4><i>Minden nap 0/24</i></h4>
            <h4>E-mail: foodifyhelp@gmail.com</h4>
            <h4>Telefon: +36 70 522 6566</h4>
            <button type='button' className='contact-btn'> Ügyfélszolgálat</button>
            <Footer />
        </div>
    );
}