import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupTableForm from "../../components/GroupTableForm";

const EditGroupTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/groups/${id}`)
      .then((res) => {
        setGroup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching group:", err);
        alert("Failed to load group data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/groups/${id}`, group)
      .then(() => {
        alert("Group updated successfully!");
        navigate("/groups/groups");
      })
      .catch((err) => {
        console.error("Error updating group:", err);
        alert("Failed to update group.");
      });
  };

  if (loading) {
    return <p>Loading group...</p>;
  }

  return (
    <GroupTableForm
      group={group}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Group"
      buttonLabel="Save"
    />
  );
};

export default EditGroupTable;
