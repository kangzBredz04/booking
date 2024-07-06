import React, { createContext, useState, useContext } from "react";

// Buat konteks bahasa
const LanguageContext = createContext();

// Penyedia konteks bahasa
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "id" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook untuk menggunakan konteks bahasa
export const useLanguage = () => useContext(LanguageContext);
