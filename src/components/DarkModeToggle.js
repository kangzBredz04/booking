import React, { useState, useEffect } from "react";
import "./Toggle.css";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dark-mode-toggle-container">
      <input
        id="toggle"
        className="toggle"
        type="checkbox"
        role="switch"
        onChange={handleChange}
        checked={isDarkMode}
        name="toggle"
        value="on"
      />
      <label htmlFor="toggle" className="slot"></label>
      <div className="curtain"></div>
    </div>
  );
};

export default DarkMode;
