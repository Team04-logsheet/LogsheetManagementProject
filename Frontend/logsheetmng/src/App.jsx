import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./pages/admin/AdminHome"; // ✅ Import AdminHome
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        {/* Main Content */}
        <div className="content-wrapper flex-grow-1">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/home" element={<AdminHome />} /> {/* ✅ Admin Route */}
          </Routes>
        </div>

        {/* Footer Always Visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
