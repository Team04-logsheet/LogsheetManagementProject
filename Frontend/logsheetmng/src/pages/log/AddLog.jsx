import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import LogForm from "../../components/LogForm"; // Assuming LogForm is in components folder

const AddLog = () => {
  const navigate = useNavigate();
  const [log, setLog] = useState({
    staffId: "",
    logsheetTypeId: "",
    courseId: "",
    moduleId: "",
    topicId: "",
    extraTopicsCovered: "",
    taskAssignGiven: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog({ ...log, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:8080/api/logs", log);
      alert("Log created successfully!");
      navigate("/logsheet/logs");
    } catch (error) {
      console.error("Error creating log:", error);
      alert("Failed to create log. Please check the console for details.");
    }
  };

  return (
    <LogForm
      log={log}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Log"
      buttonLabel="Create Log"
    />
  );
};

export default AddLog;
