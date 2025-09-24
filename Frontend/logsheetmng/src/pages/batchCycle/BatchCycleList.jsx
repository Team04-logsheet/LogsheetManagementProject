import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const BatchCycleList = () => {
  const [batchCycles, setBatchCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/batch-cycles")
      .then((response) => {
        setBatchCycles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch batch cycles");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    console.log("Edit batch cycle with id:", id);
    navigate(`/courses/batch-cycle/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this batch cycle?")) {
      try {
        await axios.delete(`http://localhost:8080/api/batch-cycles/${id}`);
        alert("Batch cycle deleted successfully!");
        // Refresh list after deletion
        setBatchCycles(batchCycles.filter((cycle) => cycle.id !== id));
      } catch (error) {
        console.error("Error deleting batch cycle:", error);
        alert("Failed to delete batch cycle");
        navigate("/courses/batch-cycle");
      }
    }
  };

  if (loading) return <p>Loading batch cycles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Batch Cycles</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/courses/batch-cycle/add")}
        >
          + Add New
        </Button>
      </div>

      {batchCycles.length === 0 ? (
        <p>No batch cycles available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batchCycles.map((cycle, index) => (
              <tr key={cycle.id}>
                <td>{index + 1}</td>
                <td>{cycle.title}</td>
                <td>{cycle.description}</td>
                <td>{cycle.startDate}</td>
                <td>{cycle.endDate}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(cycle.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cycle.id)}
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

export default BatchCycleList;
