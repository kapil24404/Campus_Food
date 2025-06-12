import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

// Navbar Component
const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-300 flex justify-around items-center py-3 shadow-lg">
      {/* Home */}
      <NavLink
        to="/home"
        className="flex flex-col items-center text-gray-800 hover:text-black"
        activeClassName="text-black"
      >
        <img
          src="https://img.icons8.com/material-rounded/24/home.png"
          alt="Home Icon"
        />
        <span className="text-sm">Home</span>
      </NavLink>

      {/* Favorites */}
      <NavLink
        to="/favorites"
        className="flex flex-col items-center text-gray-800 hover:text-black"
        activeClassName="text-black"
      >
        <img
          src="https://img.icons8.com/material-outlined/24/like--v1.png"
          alt="Favorites Icon"
        />
        <span className="text-sm">Favorites</span>
      </NavLink>

      {/* Search */}
      <NavLink
        to="/search"
        className="flex flex-col items-center text-gray-800 hover:text-black"
        activeClassName="text-black"
      >
        <img
          src="https://img.icons8.com/material-outlined/24/search.png"
          alt="Search Icon"
        />
        <span className="text-sm">Search</span>
      </NavLink>

      {/* History */}
      <NavLink
        to="/Cart"
        className="flex flex-col items-center text-gray-800 hover:text-black"
        activeClassName="text-black"
      >
        <FaCartShopping className="text-xl" />
        <span className="text-sm">Cart</span>
      </NavLink>

      {/* Profile */}
      <NavLink
        to="/profile"
        className="flex flex-col items-center text-gray-800 hover:text-black"
        activeClassName="text-black"
      >
        <img
          src="https://img.icons8.com/material-outlined/24/user.png"
          alt="Profile Icon"
        />
        <span className="text-sm">Profile</span>
      </NavLink>
    </div>
  );
};

export default Navbar;