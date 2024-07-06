/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./flight.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const flightsData = [
  {
    airline: "Garuda Indonesia",
    flightNumber: "GA 123",
    origin: "Jakarta",
    destination: "Bali",
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    price: "$150",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Singapore Airlines",
    flightNumber: "SQ 456",
    origin: "Singapore",
    destination: "New York",
    departureTime: "2:00 PM",
    arrivalTime: "8:00 AM",
    price: "$1200",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "American Airlines",
    flightNumber: "AA 789",
    origin: "Los Angeles",
    destination: "Tokyo",
    departureTime: "6:00 PM",
    arrivalTime: "10:00 AM",
    price: "$900",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Emirates",
    flightNumber: "EK 012",
    origin: "Dubai",
    destination: "London",
    departureTime: "4:00 AM",
    arrivalTime: "10:00 AM",
    price: "$700",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Qantas",
    flightNumber: "QF 456",
    origin: "Sydney",
    destination: "San Francisco",
    departureTime: "8:00 AM",
    arrivalTime: "10:00 PM",
    price: "$1100",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Cathay Pacific",
    flightNumber: "CX 789",
    origin: "Hong Kong",
    destination: "Los Angeles",
    departureTime: "10:00 PM",
    arrivalTime: "6:00 AM",
    price: "$950",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Lufthansa",
    flightNumber: "LH 123",
    origin: "Frankfurt",
    destination: "Mumbai",
    departureTime: "9:00 AM",
    arrivalTime: "9:00 PM",
    price: "$800",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "British Airways",
    flightNumber: "BA 456",
    origin: "London",
    destination: "Cape Town",
    departureTime: "3:00 PM",
    arrivalTime: "6:00 AM",
    price: "$850",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Air France",
    flightNumber: "AF 789",
    origin: "Paris",
    destination: "Beijing",
    departureTime: "7:00 AM",
    arrivalTime: "11:00 PM",
    price: "$1000",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    airline: "Qatar Airways",
    flightNumber: "QR 012",
    origin: "Doha",
    destination: "Madrid",
    departureTime: "1:00 AM",
    arrivalTime: "7:00 AM",
    price: "$750",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Flight = () => {
  const [flights, setFlights] = useState(flightsData);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [pin, setPin] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
  };

  const handlePayment = () => {
    if (pin.length >= 4 && pin.length <= 6) {
      const reservationData = {
        customerName,
        email,
        paymentMethod,
        timestamp: new Date().toLocaleString(),
        ...selectedFlight,
      };

      let reservations =
        JSON.parse(localStorage.getItem("flightsReservations")) || [];
      reservations.push(reservationData);
      localStorage.setItem("flightsReservations", JSON.stringify(reservations));

      setIsPaymentSuccess(true);
      setTimeout(() => {
        setSelectedFlight(null);
        setIsPaymentSuccess(false);
      }, 2000);
      window.location.href = "/profile";
    } else {
      alert("PIN must be 4-6 digits.");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flightContainer">
        <h2>Flight Information</h2>
        <div className="flightGrid">
          {flights.map((flight, index) => (
            <div className="flightCard" key={index}>
              <img
                src={flight.imageUrl}
                alt={`${flight.airline}`}
                className="flightImage"
              />
              <h3>{flight.airline}</h3>
              <p>
                <strong>Flight Number:</strong> {flight.flightNumber}
              </p>
              <p>
                <strong>Origin:</strong> {flight.origin}
              </p>
              <p>
                <strong>Destination:</strong> {flight.destination}
              </p>
              <p>
                <strong>Departure:</strong> {flight.departureTime}
              </p>
              <p>
                <strong>Arrival:</strong> {flight.arrivalTime}
              </p>
              <p>
                <strong>Price:</strong> {flight.price}
              </p>
              <button
                className="bookButton"
                onClick={() => handleBookNow(flight)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedFlight && (
          <div className="paymentPopup">
            <div className="paymentContent">
              <h2>Payment Information</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Payment Method:
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit">Debit</option>
                </select>
              </label>
              <label>
                PIN:
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
              </label>
              <button
                onClick={() => setSelectedFlight(null)}
                className="bookButton"
              >
                Cancel
              </button>
              <button onClick={handlePayment}>Confirm Payment</button>
              {isPaymentSuccess && <p>Payment Successful!</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flight;
