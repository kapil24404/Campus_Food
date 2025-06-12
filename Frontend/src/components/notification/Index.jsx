// Notification.jsx
import React from "react";
import "./style.css";

function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
}

export default Notification;
