import { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../assets/mainlogo.png";
import AuthContext from "../context/AuthContext";

export default function AdminNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className="shadow-sm admin-navbar"
    >
      <Container>
        <Navbar.Brand href="/admin" className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span className="fw-bold">
            {user &&
              `${user.fullName} (${user.roles
                .map((role) => role.replace("ROLE_", ""))
                .join(", ")})`}
          </span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-danger" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
