import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("access_token") // Check if token exists
  );

  const login = (token) => {
    sessionStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
