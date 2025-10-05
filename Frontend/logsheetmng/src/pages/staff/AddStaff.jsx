import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StaffForm from "../../components/StaffForm";

const AddStaff = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    staffType: "",
    roleId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/staffs", staff);
      alert("Staff member created successfully!");
      navigate("/staffs");
    } catch (error) {
      console.error("Error creating staff member:", error);
      alert("Failed to create staff member.");
    }
  };

  return (
    <StaffForm
      staff={staff}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Staff Member"
      buttonLabel="Create"
    />
  );
};

export default AddStaff;
