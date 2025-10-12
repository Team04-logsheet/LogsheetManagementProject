import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu items from the backend
    api
      .get("http://localhost:8080/api/menu-items")
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch menu items.");
        setLoading(false);
        console.error("Error fetching menu items:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/staffs/menu-item/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await api.delete(`http://localhost:8080/api/menu-items/${id}`);
        alert("Menu item deleted successfully!");
        setMenuItems(menuItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting menu item:", error);
        alert("Failed to delete menu item.");
      }
    }
  };

  if (loading) return <p>Loading menu items...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Menu Items</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/staffs/menu-item/add")}
        >
          + Add New
        </Button>
      </div>

      {menuItems.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Backend API Path</th>
              <th>Frontend Page URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.backendApiUrlPath}</td>
                <td>{item.frontendPageUrl}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(item.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
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

export default MenuItemList;
