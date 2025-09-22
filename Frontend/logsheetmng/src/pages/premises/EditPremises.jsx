import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PremisesForm from "../../components/PremisesForm";

const EditPremises = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [premises, setPremises] = useState({
    title: "",
    address: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/premises/${id}`)
      .then((res) => {
        setPremises(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching premise:", err);
        alert("Failed to load premise data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPremises({ ...premises, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/premises/${id}`, premises)
      .then(() => {
        alert("Premise updated successfully!");
        navigate("/courses/premises");
      })
      .catch((err) => {
        console.error("Error updating premise:", err);
        alert("Failed to update premise.");
      });
  };

  if (loading) {
    return <p>Loading premise...</p>;
  }

  return (
    <PremisesForm
      premises={premises}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Premise"
      buttonLabel="Save"
    />
  );
};

export default EditPremises;
