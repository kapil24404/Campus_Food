import React, { useState } from "react";

const Cart = () => {
  // Object to store shop name and price details
  const shopDetails = {
    name: "Rock N Roll",
    price: {
      fullPlate: 389,
      halfPlate: 200,
    },
  };

  const [quantity, setQuantity] = useState(1);
  const [plateType, setPlateType] = useState("fullPlate"); // Default to fullPlate

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlateChange = (type) => setPlateType(type);

  // Calculate total price based on plate type and quantity
  const totalPrice = shopDetails.price[plateType] * quantity;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">{shopDetails.name}</h1>

      <div className="bg-white p-4 rounded shadow-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-semibold">Chilli Chicken - Dry</h2>
            <p className="text-sm text-gray-500">Sed ut perspiciatis unde...</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => handlePlateChange("fullPlate")}
            className={`px-4 py-2 rounded ${
              plateType === "fullPlate" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            Full Plate ₹{shopDetails.price.fullPlate}
          </button>
          <button
            onClick={() => handlePlateChange("halfPlate")}
            className={`px-4 py-2 rounded ${
              plateType === "halfPlate" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            Half Plate ₹{shopDetails.price.halfPlate}
          </button>
        </div>

        <div className="text-right font-bold mt-2">₹{totalPrice}</div>
      </div>

      <div className="mb-4">
        <button className="w-full bg-gray-200 py-2 rounded mb-2">
          Add more items
        </button>
        <button className="w-full bg-gray-200 py-2 rounded">
          Add cooking requests
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md mb-4">
        <h3 className="font-semibold mb-2">Cooking Instructions</h3>
        <div className="flex space-x-4">
          <button className="w-1/4 bg-gray-100 py-2 rounded">
            Avoid calling
          </button>
          <button className="w-1/4 bg-gray-100 py-2 rounded"></button>
          <button className="w-1/4 bg-gray-100 py-2 rounded"></button>
          <button className="w-1/4 bg-gray-100 py-2 rounded"></button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="font-semibold mb-2">Picking Instructions</h3>
        <div className="flex space-x-4">
          <button className="w-1/3 bg-gray-100 py-2 rounded">
            Get the Code to shop owner
          </button>
          <button className="w-1/3 bg-gray-100 py-2 rounded">
            Collect it from counter
          </button>
          <button className="w-1/3 bg-gray-100 py-2 rounded">
            Directions to reach
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md mt-4">
        <h2 className="font-semibold mb-4">Bill Details</h2>

        <div className="flex justify-between mb-2">
          <span>Item Total</span>
          <span>₹{shopDetails.price[plateType]}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Preparing Time</span>
          <span>20 Mins</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery Tip</span>
          <button className="text-red-500">Add tip</button>
        </div>

        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>To Pay</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-red-500 mb-2">
            Note: No Cancellation. For Further info kindly visit shop.
          </p>
          <button className="text-red-500 underline text-sm">
            READ CANCELLATION POLICY
          </button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="font-semibold text-xl">₹{totalPrice}</span>
          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
