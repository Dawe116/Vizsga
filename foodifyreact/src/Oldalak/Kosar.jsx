import React, { useState, useEffect } from "react";
import "../Stilusok/Kosar.css";
import Footer from "../Komponensek/Footer";

export const Kosar = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div id="root">
            <h1>Kosár</h1>
            {cartItems.length === 0 ? (
                <h2>A kosár üres</h2>
            ) : (
                <div className="cart">
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} x{item.quantity} - {item.price * item.quantity} Ft
                                <button className="remove-item" onClick={() => removeFromCart(index)}>Törlés</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Összesen: {totalPrice} Ft</h3>
                    <button className="cancelorder-button" onClick={clearCart}>Kosár kiürítése</button>
                </div>
            )}
            <Footer />
        </div>
    );
};