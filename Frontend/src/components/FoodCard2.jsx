import React from "react";

const FoodCard2 = ({ message, subMessage, image }) => {
  return (
    <div
      style={{
        border: "2px solid #ddd",
        color: "#886200",
        borderRadius: "10px",
        padding: "10px",
        width: "300px",
        height: "100px",
        backgroundColor: "#EDEBCB",
        margin: "5px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        display: "flex", // Flex container
        justifyContent: "space-between", // Space between text and image
        alignItems: "center", // Center items vertically
      }}
    >
      {/* Left Text Section */}
      <div
        style={{
          flex: 10, // Take all available space on the left
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Align text to the top
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: 5, // Remove margin
          }}
        >
          {message}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#705819",
            margin: 5, // Minimal margin between text
          }}
        >
          {subMessage}
        </p>
        <button
          style={{
            backgroundColor: "#886200", // Bright red background
            color: "white", // White text for contrast
            border: "2px solid #624a0b", // Slightly darker border
            borderRadius: "8px", // Rounded corners
            padding: "1px 2px", // Space around the text
            fontSize: "16px", // Adjust font size
            fontWeight: "bold", // Bold text
            cursor: "pointer", // Pointer cursor on hover
            transition: "background-color 0.3s ease", // Smooth hover effect
            width: "100px", // Set width,
          }}
          onMouseEnter={
            (e) => (e.target.style.backgroundColor = "#624a0b") // Darker background on hover
          }
          onMouseLeave={
            (e) => (e.target.style.backgroundColor = "#886200") // Original background when not hovered
          }
        >
          Order now
        </button>
      </div>

      {/* Right Image Section */}
      <img
        src={image}
        alt={message}
        style={{
          width: "10%", // Limit the image width
          height: "100%", // Fill the card's height
          borderRadius: "10px",
          objectFit: "cover", // Ensure the image fits properly
          margin: "2px",
        }}
      />
    </div>
  );
};

export default FoodCard2;
