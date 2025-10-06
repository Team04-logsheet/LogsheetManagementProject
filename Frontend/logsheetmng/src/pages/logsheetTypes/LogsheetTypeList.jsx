import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const LogsheetTypeList = () => {
  const [logsheetTypes, setLogsheetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/logsheet-types")
      .then((response) => {
        setLogsheetTypes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch logsheet types.");
        setLoading(false);
        console.error("Error fetching logsheet types:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/logsheet/logsheet-type/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this logsheet type?")) {
      try {
        await axios.delete(`http://localhost:8080/api/logsheet-types/${id}`);
        alert("Logsheet type deleted successfully!");
        setLogsheetTypes(logsheetTypes.filter((lt) => lt.id !== id));
      } catch (error) {
        console.error("Error deleting logsheet type:", error);
        alert("Failed to delete logsheet type.");
      }
    }
  };

  if (loading) return <p>Loading logsheet types...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Logsheet Types</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/logsheet/logsheet-type/add")}
        >
          + Add New
        </Button>
      </div>

      {logsheetTypes.length === 0 ? (
        <p>No logsheet types available.</p>
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
            {logsheetTypes.map((logsheetType, index) => (
              <tr key={logsheetType.id}>
                <td>{index + 1}</td>
                <td>{logsheetType.title}</td>
                <td>{logsheetType.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(logsheetType.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(logsheetType.id)}
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

export default LogsheetTypeList;