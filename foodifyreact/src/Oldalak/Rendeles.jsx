import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { KosarContext } from "../Komponensek/KosarTartalom";
import '../Stilusok/Rendeles.css';
import Footer from '../Komponensek/Footer';

const Rendeles = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

    const { kosar, addToCart, removeFromCart, clearCart } = useContext(KosarContext);

    useEffect(() => {
        axios.get(`https://localhost:5000/api/Menu`)
        .then(response => {
            const allMenus = response.data;
            const filteredMenus = allMenus.filter(menu => menu.restaurantId === parseInt(restaurantId));
            setMenuItems(filteredMenus);
        })
        .catch(error => {
            console.error("Hiba történt:", error);
            setError(error.message);
        });
    }, [restaurantId]);

    const placeOrder = () => {
        const token = localStorage.getItem("token");
        const addresses = JSON.parse(localStorage.getItem("cimek") || "[]");

        if (!token) {
            setModalContent({
                message: ["A rendelés leadása előtt be kell jelentkeznie."],
                buttonText: "Bejelentkezés",
                buttonAction: () => navigate("/bejelentkezes")
            });
            setIsModalOpen(true);
            return;
        }

        if (!addresses || addresses.length === 0) {
            setModalContent({
                message: ["Kérjük, adja meg a kiszállítási címét a rendelés leadásához."],
                buttonText: "Saját fiók",
                buttonAction: () => navigate("/fiok")
            });
            setIsModalOpen(true);
            return;
        }

        const totalPrice = kosar.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setModalContent({
            message: [
                "A rendelést átadtuk a kiszállító partnerünknek.",
                `Teljes fizetendő összeg: ${totalPrice} Ft.`,
                "Köszönjük, hogy a Foodify-al rendelt!"
            ],
            buttonText: "Rendben",
            buttonAction: () => { setIsModalOpen(false); clearCart(); navigate("/FoodifyHome"); }
        });
        setIsModalOpen(true);
    };

    return (
        <div id="root">
            <div className="order-container">
                <div className="menu-list">
                    {error && <p className="error-message">{error}</p>}
                    {menuItems.length === 0 && !error && <p>Nincs elérhető menü.</p>}
                    {menuItems.map(menu => (
                        <MenuItemCard key={menu.id} menu={menu} addToCart={addToCart} />
                    ))}
                </div>
                <Cart kosar={kosar} removeFromCart={removeFromCart} clearCart={clearCart} placeOrder={placeOrder} />
                {isModalOpen && <OrderModal modalContent={modalContent} closeModal={() => setIsModalOpen(false)} />}
            </div>
            <Footer />
        </div>
    );
};

const MenuItemCard = ({ menu, addToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart({ ...menu, quantity });
    };

    return (
        <div className="menu-card" style={{ backgroundImage: `url(data:image/png;base64,${menu.picture})` }}>
            <div className="menu-content">
                <h3 className="menu-name">{menu.name}</h3>
                <div className="menu-description">
                    Leírás: {menu.description}
                    <h4>Ár: {menu.price} Ft</h4>
                </div>
                <div className="quantity-control">
                    <button className="minus-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button className="plus-btn" onClick={() => setQuantity(Math.min(5, quantity + 1))}>+</button>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>Kosárba</button>
            </div>
        </div>
    );
};

const Cart = ({ kosar, removeFromCart, clearCart, placeOrder }) => {
    const totalPrice = kosar.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Kosár</h2>
            <ul>
                {kosar.map((item, index) => (
                    <li key={index}>
                        {item.name} x{item.quantity} - {item.price * item.quantity} Ft
                        <button className="remove-item" onClick={() => removeFromCart(item.id)}>Törlés</button>
                    </li>
                ))}
            </ul>
            <h3>Összesen: {totalPrice} Ft</h3>
            <button className="cancelorder-button" onClick={clearCart}>Rendelés törlése</button>
            <button className="finalorder-button" onClick={placeOrder}>Rendelés leadása</button>
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

export { Rendeles, MenuItemCard, Cart };