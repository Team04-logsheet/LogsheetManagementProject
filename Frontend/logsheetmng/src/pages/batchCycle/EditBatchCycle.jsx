import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import BatchCycleForm from "../../components/BatchCycleForm";

const EditBatchCycle = () => {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();

  const [cycle, setCycle] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);

  // 1. Preload data from backend
  useEffect(() => {
    api
      .get(`http://localhost:8080/api/batch-cycles/${id}`)
      .then((res) => {
        const data = res.data;

        // Convert date (yyyy-MM-dd) so <input type="date"> accepts it
        setCycle({
          title: data.title || "",
          description: data.description || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching batch cycle:", err);
        alert("Failed to load batch cycle data");
        setLoading(false);
      });
  }, [id]);

  // 2. Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCycle({ ...cycle, [name]: value });
  };

  // 3. Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/batch-cycles/${id}`, cycle)
      .then(() => {
        alert("Batch cycle updated successfully!");
        navigate("/courses/batch-cycle"); // go back to list
      })
      .catch((err) => {
        console.error("Error updating batch cycle:", err);
        alert("Failed to update batch cycle");
        navigate("/courses/batch-cycle"); // go back to list
      });
  };

  if (loading) return <p>Loading batch cycle...</p>;

  return (
    <BatchCycleForm
      cycle={cycle}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Batch Cycle"
      buttonLabel="Save"
    />
  );
};

export default EditBatchCycle;
