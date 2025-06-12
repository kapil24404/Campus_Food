import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Signup.css";
import { auth } from "../Firebase/firebaseConfig.jsx";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Notification from "../components/notification/Index.jsx";
import image from "../assets/logo-black.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_API_BASE_URL;

  const ERROR_MESSAGES = {
    userNotFound: "No account found with this email. Please sign up.",
    wrongPassword: "Incorrect password. Please try again.",
    invalidEmail: "Invalid email address. Please check and try again.",
    generic: "Login failed. Please check your credentials and try again.",
    resetSuccess: "Password reset email sent! Check your inbox.",
    resetError: "Failed to send password reset email.",
  };

  const SUCCESS_MESSAGES = {
    login: "Login successful! Welcome back.",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });
    if (!base_url) {
      setNotification({
        message: "API base URL is not configured.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;

      const response = await fetch(`${base_url}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate token from backend.");
      }

      const data = await response.json();
      const token = data.token;

      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("email", userEmail);

      setNotification({
        message: SUCCESS_MESSAGES.login,
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);

      let errorMessage = ERROR_MESSAGES.generic;
      if (err.code === "auth/user-not-found") {
        errorMessage = ERROR_MESSAGES.userNotFound;
      } else if (err.code === "auth/wrong-password") {
        errorMessage = ERROR_MESSAGES.wrongPassword;
      } else if (err.code === "auth/invalid-email") {
        errorMessage = ERROR_MESSAGES.invalidEmail;
      }

      setNotification({ message: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setNotification({
        message: "Please enter your email address.",
        type: "error",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setNotification({
        message: ERROR_MESSAGES.resetSuccess,
        type: "success",
      });
    } catch (err) {
      console.error(err);

      let errorMessage = ERROR_MESSAGES.resetError;
      if (err.code === "auth/user-not-found") {
        errorMessage = ERROR_MESSAGES.userNotFound;
      } else if (err.code === "auth/invalid-email") {
        errorMessage = ERROR_MESSAGES.invalidEmail;
      }

      setNotification({ message: errorMessage, type: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={image}alt="Logo" className="w-60 h-30"/>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center text-red">Login</h2>
        <label className="block text-sm font-medium" htmlFor="email">Email:</label>
        <input className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email"/>
        <label  className="block text-sm font-medium" htmlFor="password">Password:</label>
        <input className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none" id="password"type="password"placeholder="Enter your password"value={password}onChange={(e) => setPassword(e.target.value)}required aria-label="Password"/>
        <button className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-center text-gray-600">
          <span className="text-red-500 cursor-pointer hover:underline forgot-password-link" onClick={handleForgotPassword}>
            Forgot Password?
          </span>
        </p>
          <p className="text-sm text-center">Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign Up</Link></p>
        </form>
        <footer className="signup-footer">
          <p>© {new Date().getFullYear()} Campus Food. All rights reserved.</p>
        </footer>
      </div>
      

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
}

export default Login;
