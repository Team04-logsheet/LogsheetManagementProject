import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Badge, Form, Row, Col } from "react-bootstrap";
import { FaInfoCircle, FaTrash, FaSort } from "react-icons/fa";
import "../../styles/listPage.css";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/logs");
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch logs.");
        setLoading(false);
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, []);

  const sortedLogs = useMemo(() => {
    let sortableLogs = [...logs];
    if (sortConfig.key !== null) {
      sortableLogs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLogs;
  }, [logs, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (log) => {
    if (log.isVerified) {
      alert("Cannot delete a verified log.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        await axios.delete(`http://localhost:8080/api/logs/${log.id}`);
        alert("Log deleted successfully!");
        setLogs(logs.filter((l) => l.id !== log.id));
      } catch (error) {
        console.error("Error deleting log:", error);
        alert("Failed to delete log.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/logsheet/logs/${id}`);
  };

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Log Management</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/logsheet/logs/add")}
        >
          + Add New Log
        </Button>
      </div>

      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Staff Name</th>
              <th>Course Name</th>
              <th>Module Title</th>
              <th>Topic Name</th>
              <th
                onClick={() => requestSort("isVerified")}
                style={{ cursor: "pointer" }}
              >
                Verified <FaSort />
              </th>
              <th
                onClick={() => requestSort("isApproved")}
                style={{ cursor: "pointer" }}
              >
                Approved <FaSort />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log, index) => (
              <tr key={log.id}>
                <td>{index + 1}</td>
                <td>{log.staffName}</td>
                <td>{log.courseName}</td>
                <td>{log.moduleTitle}</td>
                <td>{log.topicName}</td>
                <td>
                  <Badge bg={log.isVerified ? "success" : "secondary"}>
                    {log.isVerified ? "Yes" : "No"}
                  </Badge>
                </td>
                <td>
                  <Badge bg={log.isApproved ? "success" : "secondary"}>
                    {log.isApproved ? "Yes" : "No"}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(log.id)}
                    className="me-2"
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(log)}
                    title={
                      log.isVerified ? "Cannot delete verified log" : "Delete"
                    }
                    disabled={log.isVerified}
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

export default LogList;
