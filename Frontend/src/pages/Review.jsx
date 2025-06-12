import React, { useState } from "react";

const Review = () => {
  const [rating, setRating] = useState(0); // State to manage star rating

  // Function to handle star click
  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <button className="text-2xl font-bold">&times;</button>{" "}
        {/* Close Button */}
        <h2 className="text-xs sm:text-sm font-medium">
          Order #156680718886280
        </h2>
        <div></div>
      </div>

      {/* Success Section */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-white rounded-full p-4 shadow-md mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 sm:h-12 sm:w-12 text-green-600"
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
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Picked Up
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Enjoy your meal!
        </p>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-3xl shadow-md p-8 mx-2 sm:mx-4 mt-auto h-80 ">
        <div className="flex sm:flex-row justify-between mb-8 sm:mb-16">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600 text-xs sm:text-base">
              How was your meal?
            </p>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mt-1">
              Rock N Roll 
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">Hongs Kitchen</p>
            <p className="text-gray-400 text-xs mt-1">Thu, 3 Aug, 3:19 PM</p>
          </div>
          <div className="h-20 w-20 sm:h-28 sm:w-28 mx-auto sm:mr-8">
            <img
              src="https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0"
              alt="Food"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-10 w-10 sm:h-12 sm:w-12 ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.839-.197-1.54-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.052 9.385c-.784-.57-.381-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.958z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
