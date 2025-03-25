import { useState, useEffect } from "react";

const RendelesAllapot = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasAddress, setHasAddress] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        const checkAddress = () => {
            const addresses = JSON.parse(localStorage.getItem("cimek") || "[]");
            setHasAddress(addresses.length > 0);
        };

        checkAuth();
        checkAddress();

        const handleStorageChange = () => {
            checkAuth();
            checkAddress();
        };

        window.addEventListener("storage", handleStorageChange);
        
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return { isLoggedIn, hasAddress };
};

export default RendelesAllapot;