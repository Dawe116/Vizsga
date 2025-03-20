import React, { createContext, useState, useEffect } from 'react';

export const KosarContext = createContext();

export const KosarProvider = ({ children }) => {
    const [kosar, setKosar] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setKosar(savedCart);
    }, []);

    const addToCart = (item) => {
        const existingItem = kosar.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
            setKosar([...kosar]);
        } else {
            const updatedKosar = [...kosar, item];
            setKosar(updatedKosar);
        }
        localStorage.setItem("cart", JSON.stringify(kosar));
    };

    const removeFromCart = (id) => {
        const updatedKosar = kosar.filter(item => item.id !== id);
        setKosar(updatedKosar);
        localStorage.setItem("cart", JSON.stringify(updatedKosar));
    };

    const clearCart = () => {
        setKosar([]);
        localStorage.setItem("cart", JSON.stringify([]));
    };

    return (
        <KosarContext.Provider value={{ kosar, addToCart, removeFromCart, clearCart }}>
            {children}
        </KosarContext.Provider>
    );
};