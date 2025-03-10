import React from 'react';
import '../Stilusok/Feltetelek.css';
import Footer from '../Komponensek/Footer';

export const Feltetelek = () => {
    return (
<div id="root">
        <h1>Felhasználási feltételek</h1>
        <div className='feltetelek'>
        <h2>1. Bevezetés</h2>
    <p>Üdvözöljük weboldalunkon! A weboldal használatával Ön elfogadja az alábbi feltételeket. Ha nem ért egyet, kérjük, ne használja a weboldalt.</p>
    
    <h2>2. Szolgáltatásaink</h2>
    <p>Weboldalunkon keresztül különböző szolgáltatásokat nyújtunk, amelyeket kizárólag a jelen feltételek betartásával lehet igénybe venni.</p>
    
    <h2>3. Felhasználói kötelezettségek</h2>
    <p>A weboldal használata során Ön vállalja, hogy:</p>
    <ul>
        <li>Nem sérti meg a vonatkozó jogszabályokat</li>
        <li>Nem használja a weboldalt illegális vagy káros célokra</li>
        <li>Nem próbál illetéktelenül hozzáférni más felhasználók adataihoz</li>
    </ul>
    
    <h2>4. Szellemi tulajdon</h2>
    <p>A weboldalon található tartalom (pl. szövegek, képek, logók) szerzői jogvédelem alatt áll. A tartalom másolása, módosítása vagy terjesztése kizárólag írásos engedéllyel lehetséges.</p>
    
    <h2>5. Felelősség korlátozása</h2>
    <p>Nem vállalunk felelősséget semmilyen közvetlen vagy közvetett kárért, amely a weboldal használatából ered.</p>
    
    <h2>6. Harmadik felek linkjei</h2>
    <p>Weboldalunk tartalmazhat harmadik felek által biztosított linkeket. Ezek tartalmáért nem vállalunk felelősséget.</p>
    
    <h2>7. Módosítások</h2>
    <p>Fenntartjuk a jogot, hogy a felhasználási feltételeket bármikor módosítsuk. Az új feltételek a közzétételt követően azonnal hatályba lépnek.</p>
    
    <h2>8. Kapcsolat</h2>
    <p>Ha bármilyen kérdése van a felhasználási feltételekkel kapcsolatban, lépjen kapcsolatba velünk:</p>
    <ul>
        <li><strong>E-mail:</strong> info@foodify.hu</li>
        <li><strong>Cím:</strong> 3525 Miskolc, Palóczy László utca 3.</li>
    </ul>
    </div>
    <Footer />
    </div>
    );
};
