import React, { useState, useEffect, useContext } from 'react';
import { KosarTartalom } from '../Komponensek/KosarTartalom';
import { useNavigate } from "react-router-dom";
import Footer from '../Komponensek/Footer';
import '../Stilusok/Kosar.css';

export const Kosar = () => {
    const { kosar, removeFromCart, clearCart } = useContext(KosarTartalom);
    const [cartItems, setCartItems] = useState(kosar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(kosar);
    }, [kosar]);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = () => {
        const token = localStorage.getItem("token");
        const addresses = JSON.parse(localStorage.getItem("cimek") || "[]");

        if (cartItems.length === 0) {
            setModalContent({
                message: ["A kosár üres. Kérjük, válasszon egy menüt a rendeléshez."],
                buttonText: "Vissza a rendeléshez",
                buttonAction: () => navigate(`/rendeles/${kosar[0]?.restaurantId}`),
            });
            setIsModalOpen(true);
            return;
        }

        if (!token) {
            setModalContent({
                message: ["A rendelés leadása előtt be kell jelentkeznie."],
                buttonText: "Bejelentkezés",
                buttonAction: () => navigate("/bejelentkezes"),
            });
            setIsModalOpen(true);
            return;
        }

        if (!addresses || addresses.length === 0) {
            setModalContent({
                message: ["Kérjük, ellenőrizze a kiszállítási címét. Hogyha hiányos akkor adja meg a kiszállítási címét a rendelés leadásához."],
                buttonText: "Saját fiók",
                buttonAction: () => navigate("/fiok"),
            });
            setIsModalOpen(true);
            return;
        }

        setModalContent({
            message: [
                "A rendelést átadtuk a kiszállító partnerünknek.",
                `Teljes fizetendő összeg: ${totalPrice} Ft.`,
                "Köszönjük, hogy a Foodify-al rendelt!",
            ],
            buttonText: "Rendben",
            buttonAction: () => {
                clearCart();
                setIsModalOpen(false);
                navigate("/FoodifyHome");
            },
        });
        setIsModalOpen(true);
    };

    return (
        <div id="root">
            <h1>Kosár</h1>
            <div className="cart-container">
            {cartItems.length === 0 ? (
                <h2 className='cart-h2'>A kosár üres</h2>
            ) : (
                <div className="cart">

                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} x{item.quantity} - {item.price * item.quantity} Ft
                                <button className="remove-item" onClick={() => removeFromCart(item.id)}>Törlés</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Összesen: {totalPrice} Ft</h3>
                    <button className="cancelorder-button" onClick={clearCart}>Rendelés törlése</button>
                    <button className="finalorder-button" onClick={handlePlaceOrder}>Rendelés leadása</button>
                </div>
            )}
            {isModalOpen && <OrderModal modalContent={modalContent} closeModal={() => setIsModalOpen(false)} />}
            </div>
            <Footer />
        </div>
    );
};

const OrderModal = ({ modalContent, closeModal }) => {
    return (
        <div className="order-modal">
            <div className="modal-content">
                <h2>Rendelés információ</h2>
                {modalContent.message.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
                <button className="close-modal" onClick={modalContent.buttonAction}>{modalContent.buttonText}</button>
            </div>
        </div>
    );
};