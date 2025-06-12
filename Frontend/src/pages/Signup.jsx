import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import { auth } from "../Firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Notification from "../components/notification/Index";
import image2 from "../assets/logo-black.png";

const base_url = import.meta.env.VITE_API_BASE_URL;

const apiRequest = async ( method, body = null) => {
  const headers = { "Content-Type": "application/json" };
  const options = { method, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log(options)
  const response = await fetch(`${base_url}/api/users/signup`, options);

  const data = await response.json();
  const token = data.token;
  sessionStorage.setItem("access_token", token);
  
  if (!response.ok) {
    throw new Error("Failed to communicate with backend");
  }
  return;
};

const setNotificationMessage = (setNotification, message, type) => {
  setNotification({ message, type });
  setTimeout(() => {
    setNotification({ message: "", type: "" });
  }, 5000);
};

function Signup() {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      setNotificationMessage(
        setNotification,
        "Verification email sent. Please check your inbox and verify your email.",
        "success"
      );

      const checkEmailVerified = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(checkEmailVerified);

          sessionStorage.setItem("userName", name);
          sessionStorage.setItem("userEmail", email);

          await apiRequest( "POST", { userEmail: email });

          setNotificationMessage(setNotification, "Email verified!", "success");

          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
      }, 3000);
    } catch (error) {
      setNotificationMessage(setNotification, `Signup failed: ${error.message}`, "error");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      sessionStorage.setItem("userName", user.displayName);
      sessionStorage.setItem("userEmail", user.email);
      sessionStorage.setItem("userProfilePic", user.photoURL);

      await apiRequest("POST", { userEmail: user.email });

      setNotificationMessage(setNotification, `Welcome, ${user.displayName}!`, "success");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setNotificationMessage(setNotification, "Google Sign-In failed! Please try again", "error");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img src={image2} alt="Campus Food Logo" className="w-60 h-30" />
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

          <div>
            <label htmlFor="name"className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name"placeholder="Enter your name"value={name}onChange={(e) => setName(e.target.value)}required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"/>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" id="email"placeholder="Enter your email"value={email}onChange={(e) => setEmail(e.target.value)}required className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-2 focus:ring-red-500 focus:outline-none"/>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password"id="password"placeholder="Enter your password"value={password}onChange={(e) => setPassword(e.target.value)}required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"/>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="w-full bg-red-500 font-bold text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign up</button>
        </form>

        {/* Google Sign-In */}
        <div className="mt-4">
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm hover:shadow-md focus:outline-none" onClick={handleGoogleSignIn}>
            <img src="https://imgs.search.brave.com/5nUR1GQfO6oW2ZblD7hjaiWoloSjLmvkuCl8g_hkgbY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kZXZl/bG9wZXJzLmdvb2ds/ZS5jb20vc3RhdGlj/L2lkZW50aXR5L2lt/YWdlcy9icmFuZGlu/Z19ndWlkZWxpbmVf/c2FtcGxlX250X3Jk/X3NsLnN2Zw"alt="Google"className="w-5 h-5 mr-2"/>Continue with Google
          </button>
        </div>

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>

        <footer className="signup-footer">
          <p>© {new Date().getFullYear()} Campus Food. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
