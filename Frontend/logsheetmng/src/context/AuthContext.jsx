import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        // exp is in seconds, Date.now() is in milliseconds
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log("Token expired, removing from storage.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return null; // Token is expired
        }
        return storedToken; // Token is valid
      } catch (error) {
        console.error("Invalid token found in localStorage", error);
        return null;
      }
    }
    return null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
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

      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An unexpected error occurred during login.");
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
