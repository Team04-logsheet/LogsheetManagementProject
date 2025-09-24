import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import "../../styles/listPage.css";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/roles");
        setRoles(response.data);
      } catch (err) {
        setError("Failed to fetch roles.");
        console.error("Error fetching roles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleEdit = (id) => {
    navigate(`/users/role/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`http://localhost:8080/api/roles/${id}`);
        alert("Role deleted successfully!");
        setRoles(roles.filter((role) => role.id !== id));
      } catch (error) {
        console.error("Error deleting role:", error);
        alert("Failed to delete role.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/users/role/${id}`);
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Roles</h2>
        <Button variant="primary" onClick={() => navigate("/users/role/add")}>
          + Add New
        </Button>
      </div>

      {roles.length === 0 ? (
        <p>No roles available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td>{index + 1}</td>
                <td>{role.title}</td>
                <td>{role.description}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(role.id)}
                    className="me-2"
                  >
                    <FaInfoCircle />
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(role.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(role.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RoleList;
