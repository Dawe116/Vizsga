import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Stilusok/Rendeles.css';
import Footer from '../Komponensek/Footer';

const Rendeles = ({ addToCart, cartItems }) => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Menu/${restaurantId},token`)
          .then(response => {
            setData(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error("Hiba történt:", error);
            setError(error.message);
          });
      }, []);
      
    return (
        <div id="root">
        <div className="order-container">
            <div className="menu-list">
                {error && <p className="error-message">{error}</p>}
                {menuItems.map(menu => (
                    <MenuItemCard key={menu.id} item={menu} addToCart={addToCart} />
                ))}
            </div>
            <Cart cartItems={cartItems} />
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
        <div className="menu-card" style={{ backgroundImage: `url(data:image/png;base64,${menu.image})` }}>
            <div className="menu-content">
                <h3>{menu.name}</h3>
                <p>{menu.description}</p>
                <p>{menu.price} Ft</p>
                <div className="quantity-control">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(5, quantity + 1))}>+</button>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>Kosárba</button>
            </div>
        </div>
    );
};

const Cart = ({ cartItems }) => {
    if (!cartItems) return <div className="cart"><h2>Kosár</h2><p>A kosár üres.</p></div>;
    
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return (
        <div className="cart">
            <h2>Kosár</h2>
            {cartItems.length === 0 ? <p>A kosár üres.</p> : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} x{item.quantity} - {item.price * item.quantity} Ft</li>
                    ))}
                </ul>
            )}
            <h3>Összesen: {totalPrice} Ft</h3>
        </div>
    );
};

export { Rendeles, MenuItemCard, Cart };