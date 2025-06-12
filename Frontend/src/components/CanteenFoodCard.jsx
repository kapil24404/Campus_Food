import React from "react";

const CanteenFoodCard = ({ name, type, discount, time, image, priceOff }) => {
  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "20px",
        backgroundColor: "#fff",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        margin: "10px auto", // Center the card horizontally
        height: "270px",
        width: "100%", // Take full width by default
        maxWidth: "1000px", // Restrict maximum width to 1000px
      }}
      className="food-card"
    >
      <div
        style={{
          width: "100%",
          height: "150px",
          overflow: "hidden", // Ensure the image doesn’t overflow
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Makes the image fill the space properly
          }}
        />
      </div>
      <div style={{ padding: "10px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "5px 0" }}>
          {name}
        </h3>
        <p style={{ fontSize: "14px", color: "#777", margin: "5px 0" }}>
          {type}
        </p>
        <p style={{ fontSize: "14px", color: "#555", margin: "5px 0" }}>
          ⏰ {time}
        </p>
      </div>
    </div>
  );
};

export default CanteenFoodCard;
