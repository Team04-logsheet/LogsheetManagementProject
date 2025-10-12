import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../../../utils/api";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash, FaInfoCircle } from "react-icons/fa";
import "../../../styles/listPage.css";

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("http://localhost:8080/api/modules")
      .then((response) => {
        setModules(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
        setError("Failed to fetch modules");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/modules/module/edit/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/modules/module/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await api.delete(`http://localhost:8080/api/modules/${id}`);
        alert("Module deleted successfully!");
        setModules(modules.filter((m) => m.id !== id));
      } catch (error) {
        console.error("Error deleting module:", error);
        alert("Failed to delete module");
      }
    }
  };

  if (loading) return <p>Loading modules...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Modules</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/modules/module/add")}
        >
          + Add New
        </Button>
      </div>

      {modules.length === 0 ? (
        <p>No modules available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Theory Hours</th>
              <th>Practical Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, index) => (
              <tr key={mod.id}>
                <td>{index + 1}</td>
                <td>{mod.title}</td>
                <td>{mod.theoryHours}</td>
                <td>{mod.practicalHours}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(mod.id)}
                    className="me-2"
                  >
                    <FaInfoCircle />
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(mod.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(mod.id)}
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

export default ModuleList;
