import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import RoleForm from "../../components/RoleForm";

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/roles/${id}`)
      .then((res) => {
        setRole(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching role:", err);
        alert("Failed to load role data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/roles/${id}`, role)
      .then(() => {
        alert("Role updated successfully!");
        navigate("/staffs/role");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
        alert("Failed to update role.");
      });
  };

  if (loading) {
    return <p>Loading role...</p>;
  }

  return (
    <RoleForm
      role={role}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Role"
      buttonLabel="Save"
    />
  );
};

export default EditRole;
