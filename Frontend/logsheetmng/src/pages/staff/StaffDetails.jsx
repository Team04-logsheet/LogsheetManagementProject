import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Card, Button, ListGroup, Badge } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/listPage.css";

const StaffDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/api/staffs/${id}`
        );
        setStaff(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load staff details.");
        setLoading(false);
        console.error("Error fetching staff details:", err);
      }
    };
    fetchStaff();
  }, [id]);

  if (loading) return <p>Loading staff details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!staff) return <p>Staff member not found.</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staff Details</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back
        </Button>
      </div>
      <Card>
        <Card.Header as="h5">{`${staff.firstName} ${staff.lastName}`}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Email:</strong> {staff.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Contact:</strong> {staff.contact}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Staff Type:</strong> {staff.staffType}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Role ID:</strong> {staff.roleId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Status:</strong>{" "}
              <Badge bg={staff.isActive ? "success" : "danger"}>
                {staff.isActive ? "Active" : "Inactive"}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Account Locked:</strong>{" "}
              <Badge bg={staff.isAccountLocked ? "warning" : "info"}>
                {staff.isAccountLocked ? "Yes" : "No"}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Login:</strong>{" "}
              {staff.lastLogin
                ? new Date(staff.lastLogin).toLocaleString()
                : "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Joined On:</strong>{" "}
              {new Date(staff.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffDetail;
