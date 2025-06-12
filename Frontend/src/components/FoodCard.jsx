import React from "react";

const FoodCard = ({ name, type, discount, time, image, priceOff }) => {
  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "20px",
        overflow: "hidden", // Ensures child elements stay within the border radius
        width: "300px",
        height: "130px",
        backgroundColor: "#fff",
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        display: "flex",
      }}
    >
      {/* Left Side Image */}
      <div
        style={{
          width: "40%",
          height: "100%",
        }}
      >
        <img
          src={image || "https://via.placeholder.com/150"} // Use placeholder if no image
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right Side Content */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
            {name}
          </h3>
          <p style={{ fontSize: "14px", color: "#777", margin: 0 }}>{type}</p>
        </div>
        <p style={{ fontSize: "14px", color: "#000", margin: 0 }}>⏰{time}</p>
      </div>
    </div>
  );
};

export default FoodCard;
