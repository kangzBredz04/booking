import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../LanguageContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div onClick={toggleLanguage} className="languageSwitcher">
      <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "8px" }} />
      {language === "en" ? "EN" : "ID"}
    </div>
  );
};

export default LanguageSwitcher;
