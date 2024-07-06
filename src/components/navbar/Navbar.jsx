import "./navbar.css";
import DarkMode from "../DarkModeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../LanguageContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      profile: "Profile",
    },
    id: {
      profile: "Profil",
    },
  };

  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        >
          <img src="/2.png" alt="" />
        </span>
        <div className="buttonplace">
          <LanguageSwitcher />
          <button className="nav-item navButon">
            <DarkMode />
          </button>
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="navButton"
          >
            {texts[language].profile}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
