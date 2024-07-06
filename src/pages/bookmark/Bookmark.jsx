import "./bookmark.css";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Bookmark = () => {
  const [hotels, setHotels] = useState(
    localStorage.getItem("hotels")
      ? JSON.parse(localStorage.getItem("hotels"))
      : [
          {
            id: 1,
            name: "Hotel A",
            city: "Madrid",
            price: "Starting from $120",
            rating: [8.9, "Excellent"],
            image:
              "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
            bookmark: false,
          },
          {
            id: 2,
            name: "Hotel B",
            city: "Madrid",
            price: "Starting from $120",
            rating: [8.9, "Excellent"],
            image:
              "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
            bookmark: false,
          },
          {
            id: 3,
            name: "Hotel C",
            city: "Madrid",
            price: "Starting from $120",
            rating: [8.9, "Excellent"],
            image:
              "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
            bookmark: false,
          },
          {
            id: 4,
            name: "Hotel D",
            city: "Madrid",
            price: "Starting from $120",
            rating: [8.9, "Excellent"],
            image:
              "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
            bookmark: false,
          },
        ]
  );

  // Fungsi untuk merubah bookmark menjadi true
  const handleBookmark = (id) => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.id === id ? { ...hotel, bookmark: !hotel.bookmark } : hotel
    );
    setHotels(updatedHotels);
  };

  useEffect(() => {
    localStorage.setItem("hotels", JSON.stringify(hotels));
  }, [hotels]);

  // Fungsi untuk memfilter hotel yang di-bookmark
  const bookmarkedHotels = hotels.filter((hotel) => hotel.bookmark);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer"></div>
      <div className="bookmarkContainer">
        <div className="fpBookmark">
          {bookmarkedHotels.map((h) => (
            <div className="fpItemBookmark" key={h.id}>
              <img src={h.image} alt="" className="fpImg" />
              <span className="fpName">{h.name}</span>
              <span className="fpCity">{h.city}</span>
              <span className="fpPrice">{h.price}</span>
              <div className="fpBottom">
                <div className="fpRating">
                  <button>{h.rating[0]}</button>
                  <span>{h.rating[1]}</span>
                </div>
                {h.bookmark ? (
                  <IoBookmark size={20} onClick={() => handleBookmark(h.id)} />
                ) : (
                  <IoBookmarkOutline
                    size={20}
                    onClick={() => handleBookmark(h.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
