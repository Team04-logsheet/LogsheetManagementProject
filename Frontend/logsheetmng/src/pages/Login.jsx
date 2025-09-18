import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/mainlogo.png"; // your logo

export default function Login() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg">
        <div className="login-header text-center mb-4">
          <img src={logo} alt="App Logo" className="login-logo" />
          <h2 className="app-name">LogiTrack</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email or User ID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="forgot-link">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}
