import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./../../../utils/api";
import ModuleForm from "../../../components/ModuleForm";

const EditModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    theoryHours: "",
    practicalHours: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/modules/${id}`)
      .then((res) => {
        setModuleData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching module:", err);
        alert("Failed to load module data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({ ...moduleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/modules/${id}`, moduleData)
      .then(() => {
        alert("Module updated successfully!");
        navigate("/modules/module");
      })
      .catch((err) => {
        console.error("Error updating module:", err);
        alert("Failed to update module");
      });
  };

  if (loading) return <p>Loading module...</p>;

  return (
    <ModuleForm
      moduleData={moduleData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Module"
      buttonLabel="Save"
    />
  );
};

export default EditModule;
