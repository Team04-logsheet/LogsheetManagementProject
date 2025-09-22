import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BatchCycleForm from "../../components/BatchCycleForm";

const AddBatchCycle = () => {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCycle({ ...cycle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/batch-cycles", cycle);
      alert("Batch cycle created successfully!");
      navigate("/courses/batch-cycle"); // go back to list
    } catch (error) {
      console.error("Error creating batch cycle:", error);
      alert("Failed to create batch cycle");
      navigate("/courses/batch-cycle");
    }
  };

  return (
    <BatchCycleForm
      cycle={cycle}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Batch Cycle"
      buttonLabel="Create"
    />
  );
};

export default AddBatchCycle;
