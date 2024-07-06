import React, { useState } from "react";
import "./payment.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Payment = ({ addSuccessfulPayment, hotels }) => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      const storedPin = localStorage.getItem("userPin");
      if (pin === storedPin) {
        addSuccessfulPayment({
          customerName,
          email,
          paymentMethod,
          selectedHotel,
        });
        alert("Payment successful!");
      } else {
        setError("Incorrect PIN. Please try again.");
      }
    }
  };

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="payment">
        <div className="hotel-selection">
          <h2>Select a Hotel</h2>
          <div className="hotel-cards">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`hotel-card ${selectedHotel ? "selected" : ""}`}
                onClick={handleSelectHotel}
              >
                <h4>{hotel.name}</h4>
                <p>Price: ${hotel.price} per night</p>
                <p>Location: {hotel.city}</p>
              </div>
            ))}
          </div>
        </div>
        {step === 2 && (
          <div className="payment-info">
            <h2>Payment Information</h2>
            <p>Selected Hotel: {selectedHotel ? selectedHotel.name : "-"}</p>
            <p>Total Price: ${selectedHotel ? selectedHotel.price : "-"}</p>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
            <div className="payment-pin">
              <h3>Enter PIN</h3>
              <input
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <button onClick={handleConfirm}>Confirm Payment</button>
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
