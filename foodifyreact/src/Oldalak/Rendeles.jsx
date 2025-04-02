import React, { useState, useEffect, useContext } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { KosarTartalom } from "../Komponensek/KosarTartalom";
import '../Stilusok/Rendeles.css';
import Footer from '../Komponensek/Footer';
import emailjs from "emailjs-com";

const Rendeles = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();
    const { kosar, addToCart, removeFromCart, clearCart } = useContext(KosarTartalom);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const timeout = setTimeout(() => {
            if (loading) {
                setError("Hálózati hiba: Az adatok betöltése túl sokáig tart.");
                setLoading(false);
            }
        }, 30000);

        axios.get("https://localhost:5000/api/Menu")
            .then(response => {
                const allMenus = response.data;
                const filteredMenus = allMenus.filter(menu => menu.restaurantId === parseInt(restaurantId));
                setMenuItems(filteredMenus);
                clearTimeout(timeout);
            })
            .catch(error => {
                console.error("Hiba történt:", error);
                setError("Hálózati vagy szerverhiba: Az adatok nem érhetők el.");
                clearTimeout(timeout);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [restaurantId]);
    

    const placeOrder = () => {
        const token = localStorage.getItem("token");
        const addresses = JSON.parse(localStorage.getItem("cimek") || "[]");
        
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;
    
        if (!token) {
            setModalContent({
                message: ["A rendelés leadása előtt be kell jelentkeznie."],
                buttonText: "Bejelentkezés",
                buttonAction: () => navigate("/bejelentkezes")
            });
            setIsModalOpen(true);
            return;
        }

    
        const totalPrice = kosar.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderDetails = kosar.map(item => `${item.name} x${item.quantity} - ${item.price * item.quantity} Ft`).join("\n");
        const storedAddresses = JSON.parse(localStorage.getItem("cimek") || "[]");

        if (!storedAddresses || storedAddresses.length === 0 || 
            !storedAddresses[0].street || !storedAddresses[0].city || !storedAddresses[0].postalCode) {
            setModalContent({
                message: ["Kérjük, ellenőrizze a kiszállítási címét. Ha nincs cím, adja meg a rendelés leadása előtt."],
                buttonText: "Saját fiók",
                buttonAction: () => navigate("/fiok")
            });
            setIsModalOpen(true);
            return;
        }
        
        const deliveryAddress = `${storedAddresses[0].street}, ${storedAddresses[0].city}, ${storedAddresses[0].postalCode}`;
        
    
        if (userId) {
            axios.get(`https://localhost:5000/api/Users/${userId}`)
                .then(response => {
                    const user = response.data;
                    const emailParams = {
                        to_email: user.email,
                        order_details: orderDetails,
                        total_price: `${totalPrice} Ft`,
                        delivery_address: deliveryAddress
                    };
    
                    emailjs.send("service_kx0t42a", "template_b5as04l", emailParams, "BAFfkL_eMj75pPXcR")
                        .then(() => {
                            setModalContent({
                                message: [
                                    "A rendelést átadtuk a kiszállító partnerünknek.",
                                    `Teljes fizetendő összeg: ${totalPrice} Ft.`,
                                    "A rendelés visszaigazolását elküldtük az e-mail címére.",
                                    "Köszönjük, hogy a Foodify-al rendelt!"
                                ],
                                buttonText: "Rendben",
                                buttonAction: () => { setIsModalOpen(false); clearCart(); navigate("/FoodifyHome"); }
                            });
                            setIsModalOpen(true);
                        })
                        .catch(() => {
                            setModalContent({
                                message: ["Hiba történt az e-mail küldése során. Kérjük, próbálja újra később."],
                                buttonText: "Bezárás",
                                buttonAction: () => setIsModalOpen(false)
                            });
                            setIsModalOpen(true);
                        });
                })
                .catch(error => {
                    console.error("Hiba történt a felhasználói adatok lekérésekor:", error);
                    setModalContent({
                        message: ["Hiba történt a felhasználói adatok lekérésekor. Kérjük, próbálja újra később."],
                        buttonText: "Bezárás",
                        buttonAction: () => setIsModalOpen(false)
                    });
                    setIsModalOpen(true);
                });
        } else {
            setModalContent({
                message: ["Nem található felhasználói adat. Kérjük, jelentkezzen be."],
                buttonText: "Bejelentkezés",
                buttonAction: () => navigate("/bejelentkezes")
            });
            setIsModalOpen(true);
        }
    };
                
    return (
        <div id="root">
            <div className="order-container">
                <div className="menu-list">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Betöltés...</p>
                        </div>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : menuItems.length === 0 ? (
                        <p>Nincs elérhető menü.</p>
                    ) : (
                        menuItems.map(menu => (
                            <MenuItemCard key={menu.id} menu={menu} addToCart={addToCart} />
                        ))
                    )}
                </div>
                <Cart kosar={kosar} removeFromCart={removeFromCart} clearCart={clearCart} placeOrder={placeOrder} />
            </div>
            <Footer />
            {isModalOpen && <OrderModal modalContent={modalContent} closeModal={() => setIsModalOpen(false)} />}
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
        <div className="main-cart">
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