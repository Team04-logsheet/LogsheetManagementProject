import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PremisesForm from "../../components/PremisesForm";

const AddPremises = () => {
  const navigate = useNavigate();
  const [premises, setPremises] = useState({
    title: "",
    address: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPremises({ ...premises, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/premises", premises);
      alert("Premise created successfully!");
      navigate("/courses/premises");
    } catch (error) {
      console.error("Error creating premise:", error);
      alert("Failed to create premise.");
    }
  };

  return (
    <PremisesForm
      premises={premises}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Premise"
      buttonLabel="Create"
    />
  );
};

export default AddPremises;
