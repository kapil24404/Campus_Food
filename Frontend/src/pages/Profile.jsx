import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/notification/Index";
import defaultProfilePic from "../assets/account.png";

const Profile = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [user, setUser] = useState({
    name: sessionStorage.getItem("userName") || "",
    email: sessionStorage.getItem("userEmail") || "",
    mobile: "",
    hostelName: "",
    roomNo: "",
  });

  const base_url = import.meta.env.VITE_API_BASE_URL;

  const HOSTELS = [
    "NC-1",
    "NC-2",
    "NC-3",
    "NC-4",
    "NC-5",
    "NC-6",
    "Zakir-A",
    "Zakir-B",
    "Zakir-C",
    "Zakir-D",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const areAllFieldsFilled = user.mobile.trim() !== "" && user.hostelName.trim() !== "" && user.roomNo.trim() !== "";

    
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleSaveChanges = async () => {
    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
      showNotification("Session Expired! Please log in again.", "error");
      return;
    }

    const userData = {
      name: user.name,
      email: user.email,
      role: "user",
      mobile_num: user.mobile,
      hostel_name: user.hostelName,
      room_number: user.roomNo,
    };

    try {
      const response = await axios.post(
        `${base_url}/api/users/`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        showNotification("Details updated successfully!", "success");
        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to save changes!",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 lg:px-16 py-8">
      <h1 className="text-center text-xl font-bold mb-6">User Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center items-center mb-6">
        <img
          src={sessionStorage.getItem("userProfilePic") || defaultProfilePic }
          alt="Profile Pic"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Profile Form */}
      <form className="space-y-4">
        {/* Name Field */}
        <InputField label="Name" id="name" value={user.name}readOnly className="text-gray-500"/>

        {/* Mobile Number Field */}
        <InputField label="Mobile No."id="mobile"name="mobile"value={user.mobile}placeholder="+91"onChange={handleInputChange}
        />

        {/* Email Field */}
        <InputField label="Email" id="email"value={user.email} readOnly className="text-gray-500"
        />

        {/* Hostel Name Field */}
        <div className="space-y-1">
          <label htmlFor="hostelName" className="font-bold text-gray-700">Hostel Name</label>
          <select id="hostelName"name="hostelName"value={user.hostelName}onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-4">
            <option value="" disabled>
              Select Hostel
            </option>
            {HOSTELS.map((hostel) => (
              <option key={hostel} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>
        </div>

        {/* Room Number Field */}
        <InputField label="Room No."id="roomNo"name="roomNo"value={user.roomNo}placeholder="516"onChange={handleInputChange}/>

        {/* Save Changes Button */}
        <button type="button"onClick={handleSaveChanges}
          className={`w-full text-white font-semibold py-3 rounded-lg transition duration-200 ${
            areAllFieldsFilled ? "bg-red-500 hover:bg-red-600": "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!areAllFieldsFilled}
        >
          Save Changes
        </button>
      </form>

      {/* Notification Component */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
};

const InputField = ({ label, id, value, onChange, placeholder, readOnly, name, className }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="font-bold text-gray-700">
      {label}
    </label>
    <input id={id} name={name} type="text" value={value}placeholder={placeholder}onChange={onChange}readOnly={readOnly}className={`w-full border border-gray-300 rounded-lg p-4 ${className}`}/>
  </div>
);

export default Profile;
