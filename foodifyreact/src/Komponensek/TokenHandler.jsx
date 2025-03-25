import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const TokenHandler = ({ setToken, setLogged }) => {
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
    setLogged(!!storedToken);
  }, [location.pathname]);

  useEffect(() => {
    const handleTokenChange = (e) => {
      setToken(e.detail);
      setLogged(!!e.detail);
    };

    window.addEventListener("tokenChanged", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };
  }, []);

  return null;
};
