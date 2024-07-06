import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./paymentPopup.css";

const PaymentPopup = ({ closePopup, addReservation }) => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedPin = storedUserData ? storedUserData.pin : "";

    if (pin === storedPin) {
      const reservationData = {
        customerName,
        email,
        paymentMethod,
        timestamp: new Date().toLocaleString(),
        nameHotel: "Tower Street Apartments",
        address: "Elton St 125 New york",
        price: "$945 (9 nights)",
      };

      const existingReservations =
        JSON.parse(localStorage.getItem("reservations")) || [];
      existingReservations.push(reservationData);
      localStorage.setItem(
        "reservations",
        JSON.stringify(existingReservations)
      );

      alert("Reservation successful!");
      closePopup();
      window.location.href = "/profile";
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close"
          onClick={closePopup}
        />
        <h2>Reservation Information</h2>
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
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
        </select>
        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirm Payment</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default PaymentPopup;
