import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Badge } from "react-bootstrap";
import { FaInfoCircle, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/staffs");
        setStaffs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch staff members.");
        setLoading(false);
        console.error("Error fetching staff members:", err);
      }
    };
    fetchStaffs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/staffs/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:8080/api/staffs/${id}`);
        alert("Staff member deleted successfully!");
        setStaffs(staffs.filter((staff) => staff.id !== id));
      } catch (error) {
        console.error("Error deleting staff member:", error);
        alert("Failed to delete staff member.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/staffs/view/${id}`);
  };

  if (loading) return <p>Loading staff members...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Staff Management</h2>
        <Button variant="primary" onClick={() => navigate("/staffs/add")}>
          + Add New Staff
        </Button>
      </div>

      {staffs.length === 0 ? (
        <p>No staff members available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Staff Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{`${staff.firstName} ${staff.lastName}`}</td>
                <td>{staff.email}</td>
                <td>{staff.contact}</td>
                <td>{staff.staffType}</td>
                <td>
                  <Badge bg={staff.isActive ? "success" : "secondary"}>
                    {staff.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(staff.id)}
                    className="me-2"
                    title="View Details"
                  >
                    <FaInfoCircle />
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(staff.id)}
                    className="me-2"
                    title="Edit"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(staff.id)}
                    title="Delete"
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

export default StaffList;
