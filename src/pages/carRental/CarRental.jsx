/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./carRental.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const carsData = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    price: "$50/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2019,
    price: "$45/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2021,
    price: "$70/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Chevrolet",
    model: "Malibu",
    year: 2018,
    price: "$40/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "BMW",
    model: "X5",
    year: 2021,
    price: "$90/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Audi",
    model: "A4",
    year: 2019,
    price: "$80/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2020,
    price: "$85/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Tesla",
    model: "Model S",
    year: 2022,
    price: "$120/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Nissan",
    model: "Altima",
    year: 2017,
    price: "$35/day",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    make: "Volkswagen",
    model: "Passat",
    year: 2018,
    price: "$50/day",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const CarRental = () => {
  const [cars, setCars] = useState(carsData);
  const [selectedCar, setSelectedCar] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [pin, setPin] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleBookNow = (car) => {
    setSelectedCar(car);
  };

  const handlePayment = () => {
    if (pin.length >= 4 && pin.length <= 6) {
      const reservationData = {
        customerName,
        email,
        paymentMethod,
        timestamp: new Date().toLocaleString(),
        ...selectedCar,
      };

      // Save reservation data to localStorage
      let reservations =
        JSON.parse(localStorage.getItem("rentalsReservations")) || [];
      reservations.push(reservationData);
      localStorage.setItem("rentalsReservations", JSON.stringify(reservations));

      setIsPaymentSuccess(true);
      setTimeout(() => {
        setSelectedCar(null);
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
      <div className="carRentalContainer">
        <h2>Car Rental Information</h2>
        <div className="carGrid">
          {cars.map((car, index) => (
            <div className="carCard" key={index}>
              <img
                src={car.imageUrl}
                alt={`${car.make} ${car.model}`}
                className="carImage"
              />
              <h3>
                {car.make} {car.model}
              </h3>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Price:</strong> {car.price}
              </p>
              <button className="bookButton" onClick={() => handleBookNow(car)}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedCar && (
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
              <button onClick={handlePayment}>Confirm Payment</button>
              {isPaymentSuccess && <p>Payment Successful!</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRental;
