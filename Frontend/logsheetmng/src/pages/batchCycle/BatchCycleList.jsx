import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BatchCycleList = () => {
  const [batchCycles, setBatchCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch batch cycles when component mounts
    axios
      .get("http://localhost:8080/api/batch-cycles") // adjust port if needed
      .then((response) => {
        setBatchCycles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch batch cycles");
        setLoading(false);
      });
  }, []);

  // Edit Handler (for now just log, later can open form or modal)
  const handleEdit = (id) => {
    console.log("Edit batch cycle with id:", id);
    navigate(`/courses/batch-cycle/edit/${id}`);
  };

  // Delete Handler (calls backend API)
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
        navigate("/courses/batch-cycle"); // go back to list
      }
    }
  };

  if (loading) return <p>Loading batch cycles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Batch Cycles</h2>
        <button
          onClick={() => navigate("/courses/batch-cycle/add")}
          style={{ padding: "6px 12px" }}
        >
          + Add New
        </button>
      </div>

      {batchCycles.length === 0 ? (
        <p>No batch cycles available.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
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
                  <button
                    onClick={() => handleEdit(cycle.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cycle.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BatchCycleList;
