import { Outlet } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import Footer from "./components/Footer";

const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <AdminNavbar />
    <div className="d-flex flex-grow-1">
      <AdminSidebar />
      <div className="admin-content w-100">
        <div className="admin-inner">
          <Outlet /> {/* This renders the nested route content */}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
export default Layout;
