import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Bookmark from "./pages/bookmark/Bookmark";
import { LanguageProvider } from "./LanguageContext";
import React, { useState } from "react";
import Payment from "./pages/payment/Payment";
import SuccessPayments from "./components/successPayments/SuccessPayments";
import Profile from "./pages/profile/Profile";
import Flight from "./pages/flight/Flight";
import CarRental from "./pages/carRental/CarRental";

function App() {
  const [successfulPayments, setSuccessfulPayments] = useState([]);

  const addSuccessfulPayment = (payment) => {
    setSuccessfulPayments([...successfulPayments, payment]);
  };

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
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route
            path="/payment"
            element={
              <Payment
                addSuccessfulPayment={addSuccessfulPayment}
                hotels={hotels}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/success-payments"
            element={
              <SuccessPayments successfulPayments={successfulPayments} />
            }
          />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/flights" element={<Flight />} />
          <Route path="/car-rental" element={<CarRental />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
