import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./../../../utils/api";
import ModuleForm from "../../../components/ModuleForm";

const AddModule = () => {
  const navigate = useNavigate();
  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    theoryHours: "",
    practicalHours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleData({ ...moduleData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:8080/api/modules", moduleData);
      alert("Module created successfully!");
      navigate("/modules/module");
    } catch (error) {
      console.error("Error creating module:", error);
      alert("Failed to create module");
    }
  };

  return (
    <ModuleForm
      moduleData={moduleData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Module"
      buttonLabel="Create"
    />
  );
};

export default AddModule;
