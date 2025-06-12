import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

function Minimenu({ onClose }) {
  const [count, setCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState("spicy");
  const price = selectedOption === "spicy" ? 389 : 399;

  // Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 flex items-end justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-t-3xl h-[32rem] w-full shadow-lg">
        {/* Header Section */}
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-base font-semibold">Chilli Chicken</h2>
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="focus:outline-none"
          >
            <RxCross2 className="bg-gray-200 rounded-full text-2xl p-1" />
          </button>
        </div>

        {/* Content Section */}
        <div className="px-4">
          <h3 className="text-lg font-bold">Customise as per your need</h3>
          <h4 className="text-base font-medium mt-2">Type Of Chilli Chicken</h4>
          <p className="text-sm text-gray-500">Select any 1</p>

          {/* Options */}
          <div className="mt-6 space-y-2">
            {["spicy", "mild"].map((option) => (
              <label
                key={option}
                className={`flex items-center justify-between border p-3 rounded-lg ${
                  selectedOption === option
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <span>
                  Chilly Chicken Dry (
                  {option === "spicy" ? "Spicy" : "Mild Spicy"})
                </span>
                <span className="text-sm text-gray-600">
                  ₹{option === "spicy" ? 389 : 399}
                </span>
                <input
                  type="radio"
                  name="chilli-chicken"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="form-radio text-red-600 accent-red-600"
                  aria-label={`Select ${option} option`}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 mt-40">
          <div className="flex items-center border-2 border-gray-400 rounded-lg px-4 py-2">
            <button
              onClick={() => setCount(Math.max(count - 1, 1))}
              className="text-red-600 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <FaMinus />
            </button>
            <span className="px-4 text-xl">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="text-red-600 focus:outline-none"
              aria-label="Increase quantity"
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={() => {
              alert(`Added ${count} item(s) to the cart`);
              onClose();
            }}
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Add Item | ₹{price * count}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Minimenu;
