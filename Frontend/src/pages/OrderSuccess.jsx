import React from "react";

const OrderSuccess = () => {
  return (
    <div className="h-screen bg-green-700 flex flex-col items-center justify-center text-white relative">
      {/* Confetti Animation */}
      <div className="absolute inset-0">
        {/* Use a confetti library for actual animations */}
        <div className="confetti"></div>
      </div>

      {/* Success Icon */}
      <div className="bg-white rounded-full p-4 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-bold mb-2">Yay! Order Received</h1>
      <p className="text-sm">
        You saved <strong>$70</strong> on this order
      </p>
    </div>
  );
};

export default OrderSuccess;
