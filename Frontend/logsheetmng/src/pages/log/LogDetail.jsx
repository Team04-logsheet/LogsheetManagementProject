import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Card, Button, ListGroup, Badge, Alert } from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaThumbsUp } from "react-icons/fa";
import "../../styles/listPage.css";

const LogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const fetchLog = async () => {
    try {
      const response = await api.get(`http://localhost:8080/api/logs/${id}`);
      setLog(response.data);
    } catch (err) {
      setError("Failed to load log details.");
      console.error("Error fetching log details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLog();
  }, [id]);

  const handleVerify = async () => {
    try {
      await api.patch(`http://localhost:8080/api/logs/${id}/verify`);
      setActionMessage("Log verified successfully!");
      fetchLog(); // Re-fetch to get updated state
    } catch (err) {
      setError("Failed to verify log.");
      console.error("Error verifying log:", err);
    }
  };

  const handleApprove = async () => {
    try {
      await api.patch(`http://localhost:8080/api/logs/${id}/approve`);
      setActionMessage("Log approved successfully!");
      fetchLog(); // Re-fetch to get updated state
    } catch (err) {
      setError("Failed to approve log.");
      console.error("Error approving log:", err);
    }
  };

  if (loading) return <p>Loading log details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!log) return <Alert variant="warning">Log not found.</Alert>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Log Details</h2>
        <Button variant="secondary" onClick={() => navigate("/logsheet/logs")}>
          <FaArrowLeft className="me-2" /> Back to List
        </Button>
      </div>
      {actionMessage && <Alert variant="success">{actionMessage}</Alert>}
      <Card>
        <Card.Header as="h5">Log Entry by {log.staffName}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Staff:</strong> {log.staffName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course:</strong> {log.courseName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Module:</strong> {log.moduleTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Topic:</strong> {log.topicName}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Logsheet Type:</strong> {log.logsheetTypeTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Extra Topics Covered:</strong>{" "}
              {log.extraTopicsCovered || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Task/Assignment Given:</strong>{" "}
              {log.taskAssignGiven || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {log.description || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Verified:</strong>{" "}
              <Badge bg={log.isVerified ? "success" : "secondary"}>
                {log.isVerified ? "Yes" : "No"}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Approved:</strong>{" "}
              <Badge bg={log.isApproved ? "success" : "secondary"}>
                {log.isApproved ? "Yes" : "No"}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Created On:</strong>{" "}
              {new Date(log.createdAt).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Last Updated:</strong>{" "}
              {new Date(log.updatedAt).toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Approved At:</strong>{" "}
              {log.approvedAt
                ? new Date(log.approvedAt).toLocaleString()
                : "N/A"}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button
            variant="info"
            className="me-2"
            onClick={handleVerify}
            disabled={log.isVerified}
          >
            <FaCheckCircle className="me-2" /> Verify
          </Button>
          <Button
            variant="success"
            onClick={handleApprove}
            disabled={!log.isVerified || log.isApproved}
          >
            <FaThumbsUp className="me-2" /> Approve
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default LogDetail;
