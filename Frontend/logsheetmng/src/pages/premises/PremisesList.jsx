import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import "../../styles/listPage.css";

const PremisesList = () => {
  const [premises, setPremises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/premises")
      .then((response) => {
        setPremises(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch premises.");
        setLoading(false);
        console.error("Error fetching premises:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/courses/premises/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this premise?")) {
      try {
        await axios.delete(`http://localhost:8080/api/premises/${id}`);
        alert("Premise deleted successfully!");
        setPremises(premises.filter((premise) => premise.id !== id));
      } catch (error) {
        console.error("Error deleting premise:", error);
        alert("Failed to delete premise.");
      }
    }
  };

  if (loading) return <p>Loading premises...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Premises</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/courses/premises/add")}
        >
          + Add New
        </Button>
      </div>

      {premises.length === 0 ? (
        <p>No premises available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Address</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {premises.map((premise, index) => (
              <tr key={premise.id}>
                <td>{index + 1}</td>
                <td>{premise.title}</td>
                <td>{premise.address}</td>
                <td>{premise.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(premise.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(premise.id)}
                  >
                    Delete
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

export default PremisesList;
