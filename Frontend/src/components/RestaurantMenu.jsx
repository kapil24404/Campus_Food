import React, { useState } from "react";
// Import React Icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { LuSquareDot } from "react-icons/lu";
import { RiShieldStarFill } from "react-icons/ri";
import Minimenu from "./Minimenu";
import { NavLink } from "react-router-dom";

const RestaurantMenu = () => {
  const restaurantInfo = {
    name: "Rock N Roll",
    cuisines: ["Momos", "Chinese", "Beverages"],
    rating: "4.1",
    totalrating: "117",
    deliveryTime: "35-40",
    distance: "5",
    offer: "60% OFF up to Rs.100. Use code TRYNEW above Rs.159",
    hostel: "NC-3 Tower",
  };

  const menuData = [
    {
      id: 1,
      name: "Chilli Chicken - Dry (Serves 2)",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellendus assumenda fugiat cupiditate rem nisi!",
      price: 329,
      veg: false,
      bestSeller: true,
      image:
        "https://via.placeholder.com/150/FF5733/FFFFFF?text=Chilli+Chicken",
    },
    {
      id: 2,
      name: "Molten Cheese Spring Rolls (6 pcs)",
      description: "Crispy rolls filled with molten cheese.",
      price: 329,
      veg: true,
      bestSeller: false,
      image: "https://via.placeholder.com/150/FFC300/FFFFFF?text=Spring+Rolls",
    },
    {
      id: 3,
      name: "Veg Momos (10 pcs)",
      description: "Steamed momos filled with fresh vegetables.",
      price: 199,
      veg: true,
      bestSeller: true,
      image: "https://via.placeholder.com/150/28A745/FFFFFF?text=Veg+Momos",
    },
    {
      id: 4,
      name: "Chicken Fried Rice",
      description: "Flavorful fried rice with chicken and vegetables.",
      price: 249,
      veg: false,
      bestSeller: false,
      image: "https://via.placeholder.com/150/007BFF/FFFFFF?text=Fried+Rice",
    },
  ];

  const [filters, setFilters] = useState({
    veg: true,
    nonVeg: true,
    bestSeller: false,
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const handleCloseMiniMenu = () => {
     setSelectedItem(null);
   };

  const filteredMenu = menuData.filter((item) => {
    if (filters.bestSeller && !item.bestSeller) return false;
    if (!filters.veg && !item.veg) return false;
    if (!filters.nonVeg && item.veg) return false;
    return true;
  });

  return (
    <div className="bg-white p-4 max-w-screen-lg mx-auto">
      {/* Navbar */}
      <div className="w-full h-10 flex justify-between">
        <div className="mx-2 my-2 text-xl">
          <NavLink to="/">
            <FaArrowLeftLong />
          </NavLink>
        </div>
        <div className="list-none">
          <ul className="flex">
            <a href="./">
              <li className="mx-2 my-2 text-xl">
                <IoSearchOutline />
              </li>
            </a>
            <a href="./">
              <li className="mx-2 my-2 text-xl">
                <FaRegHeart />
              </li>
            </a>
            <a href="./">
              <li className="mx-2 my-2 text-xl">
                <IoShareOutline />
              </li>
            </a>
            <a href="./">
              <li className="mx-2 my-2 text-xl">
                <BsThreeDotsVertical />
              </li>
            </a>
          </ul>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="text-center p-4 rounded-lg">
        <h1 className="text-4xl font-semibold">{restaurantInfo.name}</h1>
        <p className="mt-4 text-base">{restaurantInfo.cuisines.join("  ")}</p>
        <div className="mt-2 text-center my-2">
          <span className="text-white bg-blue-700 font-bold p-1 rounded">
            {restaurantInfo.rating} ★
          </span>
          <span className="text-lg mx-4">
            {restaurantInfo.totalrating} ratings
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex gap-2">
        <button
          className={`px-2 py-1 rounded-lg ${
            filters.veg ? "border-2 border-[#B8B8B8]" : "bg-gray-200"
          }`}
          onClick={() => setFilters((prev) => ({ ...prev, veg: !prev.veg }))}
        >
          <LuSquareDot className="text-green-600 inline-block font-bold" /> Veg
        </button>
        <button
          className={`px-2 py-1 rounded-lg ${
            filters.nonVeg ? "border-2 border-[#B8B8B8]" : "bg-gray-200"
          }`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, nonVeg: !prev.nonVeg }))
          }
        >
          Non-veg
        </button>
        <button
          className={`px-2 py-1 rounded-lg ${
            filters.bestSeller ? "border-2 border-[#B8B8B8]" : "bg-gray-200"
          }`}
          onClick={() =>
            setFilters((prev) => ({ ...prev, bestSeller: !prev.bestSeller }))
          }
        >
          <RiShieldStarFill className="text-blue-600 inline-block" /> Best
          Seller
        </button>
      </div>

      {/* Menu List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-white p-2 rounded-lg flex items-center w-full h-52"
          >
            <div className="h-full w-3/5 pr-2 pl-1 overflow-hidden">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <span className="font-bold">₹{item.price}</span>
              <p className="text-gray-500">{item.description}</p>
            </div>
            <div className="relative w-2/5 h-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 rounded-lg object-cover"
              />
              <button
                className="absolute translate-x-7 -translate-y-6  z-1 px-8 py-1 rounded-lg font-bold border-2 border-red-500 bg-red-100 text-red-500"
                onClick={() => setSelectedItem(item)}
              >
                ADD +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <Minimenu onClose={handleCloseMiniMenu} />
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
