import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import RoleForm from "../../components/RoleForm";

const AddRole = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:8080/api/roles", role);
      alert("Role created successfully!");
      navigate("/staffs/role");
    } catch (error) {
      console.error("Error creating role:", error);
      alert("Failed to create role.");
    }
  };

  return (
    <RoleForm
      role={role}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Role"
      buttonLabel="Create"
    />
  );
};

export default AddRole;
