import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:8080/api", // Your Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

/*
  This interceptor adds the Authorization header to every request if a token exists.
  This is how your backend will recognize authenticated users.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
