import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/mainlogo.png";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(userid, password);
      // Navigation will be handled by the AuthContext
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err.message);
    } finally {
      // Always stop loading, whether it succeeded or failed
      setLoading(false);
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
          <a href="#" className="forgot-link">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
