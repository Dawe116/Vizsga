import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../Stilusok/Rendeles.css';
import Footer from '../Komponensek/Footer';

const Rendeles = ({ addToCart, cartItems, setCartItems }) => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`https://localhost:5000/api/Menu`, { 
        })
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

    const clearCart = () => {
        setCartItems([]);
    };

    const placeOrder = () => {
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
                <Cart cartItems={cartItems} setCartItems={setCartItems} clearCart={clearCart} placeOrder={placeOrder} />
                {isModalOpen && <OrderModal cartItems={cartItems} closeModal={() => { setIsModalOpen(false); clearCart(); }} />}
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
                <p>Leírás: {menu.description}</p>
                <p>Ár: {menu.price} Ft</p>
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

const Cart = ({ cartItems, setCartItems, clearCart, placeOrder }) => {
    const removeFromCart = (index) => {
        const newCart = cartItems.filter((_, i) => i !== index);
        setCartItems(newCart);
    };

    if (!cartItems || cartItems.length === 0) {
        return <div className="cart"><h2>Kosár</h2><p>A kosár üres.</p></div>;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Kosár</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} x{item.quantity} - {item.price * item.quantity} Ft
                        <button className="remove-item" onClick={() => removeFromCart(index)}>Törlés</button>
                    </li>
                ))}
            </ul>
            <h3>Összesen: {totalPrice} Ft</h3>
            
            <button className="cancelorder-button" onClick={clearCart}>Rendelés törlése</button>
            <button className="finalorder-button" onClick={placeOrder}>Rendelés leadása</button>
        </div>
    );
};

const OrderModal = ({ cartItems, closeModal }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    return (
      <div className="order-modal">
        <div className="modal-content">
          <h2>Rendelés leadva!</h2>
          <p>A rendelést átadtuk a kiszállító partnerünknek.</p>
          <h3>Fizetendő összeg: {totalPrice} Ft</h3>
          <p>Köszönjük, hogy a Foodify-n rendeltél!</p>
          <Link to="/FoodifyHome"><button className="close-modal" onClick={closeModal}>Rendben</button></Link>
        </div>
      </div>
    );
  };  

export { Rendeles, MenuItemCard, Cart };
