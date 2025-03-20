import { createContext, useContext, useState } from "react";

const KosarContext = createContext();

export const KosarProvider = ({ children }) => {
  const [kosar, setKosar] = useState([]);

  const hozzaadKosarhoz = (item) => {
    setKosar((elozoKosar) => {
      const letezoElem = elozoKosar.find((elem) => elem.id === item.id);
      if (letezoElem) {
        return elozoKosar.map((elem) =>
          elem.id === item.id ? { ...elem, mennyiseg: elem.mennyiseg + 1 } : elem
        );
      }
      return [...elozoKosar, { ...item, mennyiseg: 1 }];
    });
  };

  const torolKosarbol = (id) => {
    setKosar((elozoKosar) => elozoKosar.filter((elem) => elem.id !== id));
  };

  const uritKosarat = () => {
    setKosar([]);
  };

  return (
    <KosarContext.Provider value={{ kosar, hozzaadKosarhoz, torolKosarbol, uritKosarat }}>
      {children}
    </KosarContext.Provider>
  );
};

export const useKosar = () => useContext(KosarContext);