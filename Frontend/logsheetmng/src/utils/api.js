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

// ✅ Response Interceptor: Handles 401 errors globally
api.interceptors.response.use(
  (response) => response, // Directly return successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // If a 401 response is received, the token is invalid or expired
      console.log("Unauthorized request. Logging out.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
