import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../assets/mainlogo.png";

export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className="shadow-sm admin-navbar"
    >
      <Container /* fluid if you want full width: fluid */>
        <Navbar.Brand href="/admin" className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span className="fw-bold">LogiTrack Admin</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
