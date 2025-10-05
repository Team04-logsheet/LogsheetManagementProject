import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // We will create this utility file next

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // If we have a token, we could validate it with the backend here
      // For simplicity, we'll just parse the user info from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const { jwtToken, fullName, username, roles } = response.data;

      setToken(jwtToken);
      const userData = { fullName, username, roles };
      setUser(userData);

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));

      api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      // Navigate to a protected route after login
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // Check if the error has a response from the server and a data object
      if (error.response && error.response.data && error.response.data.error) {
        // Re-throw the specific error message from our Spring Boot backend
        throw new Error(error.response.data.error);
      } else {
        // Re-throw a generic error if the backend error format is unexpected
        throw new Error("An unexpected error occurred during login.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
