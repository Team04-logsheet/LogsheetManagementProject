import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroupTableForm from "../../components/GroupTableForm";

const AddGroupTable = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/groups", group);
      alert("Group created successfully!");
      navigate("/groups/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };

  return (
    <GroupTableForm
      group={group}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Group"
      buttonLabel="Create"
    />
  );
};

export default AddGroupTable;
