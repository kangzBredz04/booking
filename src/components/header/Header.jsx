import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons/faBookBookmark";
import { useLanguage } from "../../LanguageContext";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleHotels = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  const { language } = useLanguage();

  const texts = {
    en: {
      hotel: "Hotels",
      flight: "Flights",
      car: "Car Rentals",
      bookmark: "Hotel Bookmark",
      lifetime: "A lifetime of discounts? It's Genius.",
      rewarded:
        "Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account",
      signin: "Sign In",
      signup: "Sign Up",
    },
    id: {
      hotel: "Hotel",
      flight: "Penerbangan",
      car: "Rental Mobil",
      bookmark: "Bookmark Hotel",
      lifetime: "Diskon seumur hidup? Itu Jenius.",
      rewarded:
        "Dapatkan imbalan untuk perjalanan Anda – dapatkan penghematan instan sebesar 10% atau lebih dengan akun Lamabooking gratis",
      signin: "Masuk",
      signup: "Daftar",
    },
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem" onClick={handleHotels}>
            <FontAwesomeIcon icon={faBed} />
            <span>{texts[language].hotel}</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => {
              window.location.href = "/flights";
            }}
          >
            <FontAwesomeIcon icon={faPlane} />
            <span>{texts[language].flight}</span>
          </div>
          <div
            className="headerListItem"
            onClick={() => {
              window.location.href = "/car-rental";
            }}
          >
            <FontAwesomeIcon icon={faCar} />
            <span>{texts[language].car}</span>
          </div>
          <div
            onClick={() => {
              // navigate("bookmark");
              window.location.href = "/bookmark";
            }}
            className="headerListItem"
          >
            <FontAwesomeIcon icon={faBookBookmark} />
            <span>{texts[language].bookmark}</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">{texts[language].lifetime}</h1>
            <p className="headerDesc">{texts[language].rewarded}</p>
            <button className="headerBtn">
              {texts[language].signin} / {texts[language].signup}
            </button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn">Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
