import React, { useState } from "react";
import FoodCard from "../components/Foodcard.jsx";
import FoodCard2 from "../components/FoodCard2.jsx";
import Navbar from "../components/Navbar.jsx";
import FixedFoodCard from "../components/FixedFoodCard.jsx";
import CanteenFoodCard from "../components/CanteenFoodCard.jsx";
import "../CSS/Home.css";
import { IoSearchOutline } from "react-icons/io5";
const FoodOrderPage = () => {
  // Dummy food items
  const foodItems = [
    {
      id: 1,
      name: "Chicken Rice",
      category: "North Indian",
      discount: "40% OFF",
      time: "30-35 min",
      distance: "1.2 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 2,
      name: "Paneer Butter ",
      category: "North Indian",
      discount: "30% OFF",
      time: "20-25 min",
      distance: "2.0 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 3,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 4,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 5,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 6,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 7,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 8,
      name: "Veg Biryani",
      category: "South Indian",
      discount: "20% OFF",
      time: "25-30 min",
      distance: "1.8 km",
      image: "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
  ];
  const foodMessages = [ // this object is created to pass the values of message and submessages of the very first food card seen on the home page
    {
      id: 1,
      message: "It's Dinner Time",
      subMessage: "Get your food ready in just 15 mins!",
      image:
        "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 2,
      message: "AAOJI KHAOJI",
      subMessage: "INSTANTLY READY FOOD",
      image:
        "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 3,
      message: "Good Morning, Pinapple?",
      subMessage: "Looks Juicy",
      image:
        "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 4,
      message: "It's Dinner Time",
      subMessage: "Get your food ready in just 15 mins!",
      image:
        "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
    {
      id: 5,
      message: "It's Dinner Time",
      subMessage: "Get your food ready in just 15 mins!",
      image:
        "https://imgs.search.brave.com/4fOpRDRw4fvIC8d3r99iDW-IBR4jCXMp4Vir5fE8QMQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI1/MzgyNjg5NC9waG90/by92YXJpb3VzLWtp/bmRzLW9mLXZlZ2Fu/LXByb3RlaW4tc291/cmNlcy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NC0yZUZC/Ml9pSU5tVlFaTzJM/WVFpSGpLMUZsa3Bs/WlYwWVVneGJ1QXJI/OD0",
    },
  ];

  const [recommended, setRecommended] = useState(true);

  // Filtered items based on the active tab
  const filteredItems = recommended
    ? foodItems.slice(0, 8) // Dummy logic for "Recommended"
    : foodItems;

  const userName = localStorage.getItem("userName")

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Navbar className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-4 shadow-md z-10"></Navbar>
      <div className="bg-red-500 text-white px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-bold">Welcome</p>
            <p>NC-4 Tower</p>
          </div>
          <div className="flex">
            <button
              className="flex items-center justify-center px-3 font-semibold text-xl"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
            <button
              className="flex items-center justify-center px-3 font-semibold text-xl"
              onClick={() => (window.location.href = "/Signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full p-1 mt-1 shadow-md">
          <input
            type="text"
            placeholder="Search for 'Pizza'"
            className="flex-grow outline-none px-4 py-2 rounded-full text-black"
          />
          <button className="flex items-center justify-center px-3">
            <IoSearchOutline className="text-red-800 mr-4 text-xl" />
          </button>
        </div>
      </div>

      {/* First FoodCard */}
      <div className="home_container flex space-x-2 overflow-x-auto p-4">
        {" "}
        {foodMessages.map((food, index) => (
          <div className="home_container_mini flex-shrink-0">
            <FoodCard2
              message={food.message}
              subMessage={food.subMessage}
              image={food.image}
            />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-4 flex justify-around mt-4 border border-gray-300 rounded-md">
        <button
          onClick={() => setRecommended(true)}
          className={`w-1/2 py-2 font-semibold ${
            recommended ? "bg-red-500 text-white" : "bg-white text-gray-500"
          } rounded-l-md`}
        >
          Recommended
        </button>
        <button
          onClick={() => setRecommended(false)}
          className={`w-1/2 py-2 font-semibold ${
            !recommended ? "bg-red-500 text-white" : "bg-white text-gray-500"
          } rounded-r-md`}
        >
          ❤ Favourites
        </button>
      </div>

      {/* Second Food Card */}
      <div className=" second_food_cart home_container p-4 space-y-4 overflow-x-auto">
        {/* First Layer */}
        <div className="flex space-x-4">
          {filteredItems
            .slice(0, Math.ceil(filteredItems.length / 2))
            .map((item) => (
              <div key={item.id} className="second_food_cart min-w-[220px]">
                <FoodCard
                  name={item.name}
                  type={item.category}
                  discount={item.discount}
                  time={item.time}
                  image={item.image}
                  priceOff={item.priceOff}
                />
              </div>
            ))}
        </div>

        {/* Second Layer */}
        <div className="flex space-x-4">
          {filteredItems
            .slice(Math.ceil(filteredItems.length / 2))
            .map((item) => (
              <div key={item.id} className="second_food_cart min-w-[220px]">
                <FoodCard
                  name={item.name}
                  type={item.category}
                  discount={item.discount}
                  time={item.time}
                  image={item.image}
                  priceOff={item.priceOff}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center justify-center mb-1">
        {/* Line before the text */}
        <div className="border-t border-gray-300 w-full"></div>

        {/* Text in the center */}
        <div className="px-4 bg-gray-100 text-gray-500 whitespace-nowrap text-center">
          WHAT'S ON YOUR MIND
        </div>

        {/* Line after the text */}
        <div className="border-t border-gray-300 w-full"></div>
      </div>

      <div className="home_container p-4 space-y-0 overflow-x-auto">
        <FixedFoodCard />
      </div>
      <div className="flex items-center justify-center mb-1">
        {/* Line before the text */}
        <div className="border-t border-gray-300 w-full"></div>

        {/* Text in the center */}
        <div className="px-4 bg-gray-100 text-gray-500 whitespace-nowrap text-center">
          ALL CANTEENS
        </div>

        {/* Line after the text */}
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="home_container p-4 space-y-4 overflow-x-auto">
        {/* First Layer */}
        {/* <div>
          {filteredItems
            .slice(0, Math.ceil(filteredItems.length / 2))
            .map((item) => (
              <div
                key={item.id}
                className="min-w-[220px]"
                style={{
                  flex: "0 0 auto", // Ensures cards don’t shrink or grow
                }}
              >
                <CanteenFoodCard
                  name={item.name}
                  type={item.category}
                  discount={item.discount}
                  time={item.time}
                  image={item.image}
                  priceOff={item.priceOff}
                />
              </div>
            ))}
        </div> */}

        {/* Second Layer */}
        <div>
          {filteredItems
            .slice(Math.ceil(filteredItems.length / 2))
            .map((item) => (
              <div key={item.id} className="second_food_cart min-w-[220px]">
                <CanteenFoodCard
                  name={"Rock & Roll"} // name={item.name}
                  type={item.category}
                  discount={item.discount}
                  time={item.time}
                  image={item.image}
                  priceOff={item.priceOff}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FoodOrderPage;
