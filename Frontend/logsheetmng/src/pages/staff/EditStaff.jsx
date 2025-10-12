import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import StaffForm from "../../components/StaffForm";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    staffType: "",
    roleId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/api/staffs/${id}`
        );
        const { roleId, ...rest } = response.data;
        setStaff({
          ...rest,
          roleId: roleId.toString(), // Ensure roleId is a string for the select input
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching staff member:", err);
        alert("Failed to load staff data.");
        setLoading(false);
      }
    };
    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exclude read-only fields from the payload
    const { id: staffId, createdAt, updatedAt, ...payload } = staff;
    api
      .patch(`http://localhost:8080/api/staffs/${id}`, payload)
      .then(() => {
        alert("Staff member updated successfully!");
        navigate("/staffs");
      })
      .catch((err) => {
        console.error("Error updating staff member:", err);
        alert("Failed to update staff member.");
      });
  };

  if (loading) {
    return <p>Loading staff member...</p>;
  }

  return (
    <StaffForm
      staff={staff}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Staff Member"
      buttonLabel="Save Changes"
    />
  );
};

export default EditStaff;
