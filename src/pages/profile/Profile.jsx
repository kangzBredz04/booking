import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    password: "********", // Dummy password
    email: "johndoe@example.com",
    pin: "", // Initialize empty PIN
  });

  const [staysReservations, setStaysReservations] = useState([]);
  const [flightsReservations, setFlightsReservations] = useState([]);
  const [rentalsReservations, setRentalsReservations] = useState([]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem("reservations"));
    if (storedReservations) {
      setStaysReservations(storedReservations);
    }
  }, [staysReservations]);

  useEffect(() => {
    const storedReservationsFlight = JSON.parse(
      localStorage.getItem("flightsReservations")
    );
    if (storedReservationsFlight) {
      setFlightsReservations(storedReservationsFlight);
    }
  }, [flightsReservations]);

  useEffect(() => {
    const storedReservationsRental = JSON.parse(
      localStorage.getItem("rentalsReservations")
    );
    if (storedReservationsRental) {
      setRentalsReservations(storedReservationsRental);
    }
  }, [rentalsReservations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    if (userData.pin.length >= 4 && userData.pin.length <= 6) {
      // Update PIN in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("PIN updated successfully!");
    } else {
      alert("PIN must be 4-6 digits.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-section">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
      </div>
      <div className="profile-section">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
      </div>
      <div className="profile-section">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
      </div>
      <div className="profile-section">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          disabled // Password field disabled for security reasons
        />
      </div>
      <div className="profile-section">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      </div>
      <div className="profile-section">
        <label>Current PIN:</label>
        <p>{userData.pin ? userData.pin.replace(/./g, "*") : "Not set"}</p>
      </div>
      <div className="profile-section">
        <label>Enter New PIN:</label>
        <input
          type="password"
          name="pin"
          value={userData.pin}
          onChange={handleInputChange}
          placeholder="Enter new PIN"
        />
      </div>
      <button className="buttonProfile" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      <button
        className="buttonProfile"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>

      <div className="history-container">
        <h2>Stays Reservation History</h2>
        {staysReservations.length > 0 ? (
          staysReservations.map((reservation, index) => (
            <div className="history-card" key={index}>
              <h3>{reservation.nameHotel}</h3>
              <p>
                <strong>Customer Name:</strong> {reservation.customerName}
              </p>
              <p>
                <strong>Email:</strong> {reservation.email}
              </p>
              <p>
                <strong>Payment Method:</strong> {reservation.paymentMethod}
              </p>
              <p>
                <strong>Timestamp:</strong> {reservation.timestamp}
              </p>
              <p>
                <strong>Address:</strong> {reservation.address}
              </p>
              <p>
                <strong>Price:</strong> {reservation.price}
              </p>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>

      <div className="history-container">
        <h2>Flights Reservation History</h2>
        {flightsReservations.length > 0 ? (
          <div>
            <div className="reservation-history">
              {flightsReservations.map((reservation, index) => (
                <div className="reservation-card" key={index}>
                  <h3>{reservation.airline}</h3>
                  <p>
                    <strong>Flight Number:</strong> {reservation.flightNumber}
                  </p>
                  <p>
                    <strong>Origin:</strong> {reservation.origin}
                  </p>
                  <p>
                    <strong>Destination:</strong> {reservation.destination}
                  </p>
                  <p>
                    <strong>Departure:</strong> {reservation.departureTime}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {reservation.arrivalTime}
                  </p>
                  <p>
                    <strong>Price:</strong> {reservation.price}
                  </p>
                  <p>
                    <strong>Customer Name:</strong> {reservation.customerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {reservation.email}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {reservation.paymentMethod}
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {reservation.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>

      <div className="history-container">
        <h2>Car Rental Reservation History</h2>
        {rentalsReservations.length > 0 ? (
          rentalsReservations.map((reservation, index) => (
            <div className="reservation-card" key={index}>
              <h3>
                {reservation.make} {reservation.model}
              </h3>
              <p>
                <strong>Year:</strong> {reservation.year}
              </p>
              <p>
                <strong>Price:</strong> {reservation.price}
              </p>
              <p>
                <strong>Customer Name:</strong> {reservation.customerName}
              </p>
              <p>
                <strong>Email:</strong> {reservation.email}
              </p>
              <p>
                <strong>Payment Method:</strong> {reservation.paymentMethod}
              </p>
              <p>
                <strong>Timestamp:</strong> {reservation.timestamp}
              </p>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
