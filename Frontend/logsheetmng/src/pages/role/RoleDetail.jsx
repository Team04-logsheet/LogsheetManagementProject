import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {
  Card,
  Button,
  ListGroup,
  Modal,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import "../../styles/listPage.css";

const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for role details and assigned menu items
  const [role, setRole] = useState(null);
  const [assignedItems, setAssignedItems] = useState([]);

  // State for the "Add Item" modal
  const [showModal, setShowModal] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // General loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch role details and assigned menu items on component mount
  useEffect(() => {
    const fetchRoleData = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch

      const rolePromise = api.get(`http://localhost:8080/api/roles/${id}`);
      const itemsPromise = api.get(
        `http://localhost:8080/api/role-menu-items/role/${id}`
      );

      const [roleResult, itemsResult] = await Promise.allSettled([
        rolePromise,
        itemsPromise,
      ]);

      // Handle the result of the role API call
      if (roleResult.status === "fulfilled") {
        setRole(roleResult.value.data);
      } else {
        // If fetching the role itself fails, it's a critical error.
        console.error("Failed to fetch role:", roleResult.reason);
        setError("Failed to load role details.");
        setLoading(false);
        return; // Stop execution
      }

      // Handle the result of the assigned items API call
      if (itemsResult.status === "fulfilled") {
        setAssignedItems(itemsResult.value.data);
      } else {
        // If it fails (e.g., 404 Not Found), just set an empty array.
        console.warn(
          "Could not fetch assigned menu items, treating as empty.",
          itemsResult.reason
        );
        setAssignedItems([]);
      }

      setLoading(false);
    };

    fetchRoleData();
  }, [id]);

  // Fetch all available menu items when the modal is opened
  const handleShowModal = async () => {
    try {
      const response = await api.get("http://localhost:8080/api/menu-items");
      // Filter out items that are already assigned to this role
      const assignedItemIds = new Set(
        assignedItems.map((item) => item.menuItem.id)
      );
      const availableItems = response.data.filter(
        (item) => !assignedItemIds.has(item.id)
      );
      setAllItems(availableItems);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
      alert("Could not load menu items.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const itemId = parseInt(value, 10);
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  // Handle assigning selected menu items to the role
  const handleAssignItems = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one menu item.");
      return;
    }
    try {
      const payload = {
        roleId: role.id,
        menuItemIds: selectedItems,
      };
      await api.post("http://localhost:8080/api/role-menu-items", payload);

      // Refresh assigned items list after successful assignment
      const updatedItemsRes = await api.get(
        `http://localhost:8080/api/role-menu-items/role/${id}`
      );
      setAssignedItems(updatedItemsRes.data);

      alert("Menu items assigned successfully!");
      setShowModal(false);
      setSelectedItems([]);
    } catch (error) {
      console.error("Error assigning menu items:", error);
      alert("Failed to assign menu items.");
    }
  };

  // Handle deleting a menu item from the role
  const handleDeleteItem = async (menuItemId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this menu item from the role?"
      )
    ) {
      try {
        await api.delete(
          `http://localhost:8080/api/role-menu-items/${role.id}/menu-items/${menuItemId}`
        );
        // Remove item from state to update UI instantly
        setAssignedItems(
          assignedItems.filter((item) => item.menuItem.id !== menuItemId)
        );
        alert("Menu item removed successfully!");
      } catch (error) {
        console.error("Error removing menu item:", error);
        alert("Failed to remove menu item.");
      }
    }
  };

  if (loading) return <p>Loading role details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!role) return <Alert variant="warning">Role not found.</Alert>;

  return (
    <>
      <div className="list-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Role Details</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </div>
        <Card className="mb-4">
          <Card.Header as="h5">{role.name}</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>ID:</strong> {role.id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {role.description || "N/A"}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Assigned Menu Items</h4>
          <Button variant="success" onClick={handleShowModal}>
            <FaPlus className="me-2" /> Add Menu Items
          </Button>
        </div>

        <Card>
          <ListGroup variant="flush">
            {assignedItems.length > 0 ? (
              assignedItems.map(({ menuItem }) => (
                <ListGroup.Item
                  key={menuItem.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{menuItem.title}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteItem(menuItem.id)}
                  >
                    <FaTrash />
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>
                No menu items assigned to this role.
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </div>

      {/* Modal for Adding Menu Items */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Menu Items to "{role.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allItems.length > 0 ? (
            <Form>
              <Row>
                {allItems.map((item) => (
                  <Col md={6} key={item.id} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={`menu-item-${item.id}`}
                      label={item.title}
                      value={item.id}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form>
          ) : (
            <p>No new menu items available to add.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignItems}
            disabled={selectedItems.length === 0}
          >
            Assign Selected
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleDetail;
