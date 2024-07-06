import React from "react";
import "./successPayments.css";

const SuccessPayments = ({ successfulPayments }) => {
  return (
    <div className="success-payments">
      <h2>Successful Payments</h2>
      {successfulPayments.length === 0 ? (
        <p>No successful payments yet.</p>
      ) : (
        successfulPayments.map((payment, index) => (
          <div key={index} className="payment-card">
            <h3>{payment.customerName}</h3>
            <p>{payment.email}</p>
            <p>Method: {payment.paymentMethod}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SuccessPayments;
