import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const GroupTableList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/groups")
      .then((response) => {
        setGroups(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch groups.");
        setLoading(false);
        console.error("Error fetching groups:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/groups/edit/${id}`);
    };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`http://localhost:8080/api/groups/${id}`);
        alert("Group deleted successfully!");
        setGroups(groups.filter((group) => group.id !== id));
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Failed to delete group.");
      }
    }
  };

  if (loading) return <p>Loading groups...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Groups</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/groups/add")}
        >
          + Add New
        </Button>
      </div>

      {groups.length === 0 ? (
        <p>No groups available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={group.id}>
                <td>{index + 1}</td>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(group.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(group.id)}
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

export default GroupTableList;
