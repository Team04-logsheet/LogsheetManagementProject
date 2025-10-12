import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import LogsheetTypeForm from "../../components/LogsheetTypeForm";

const EditLogsheetType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logsheetType, setLogsheetType] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogsheetType = async () => {
      try {
        const res = await api.get(
          `http://localhost:8080/api/logsheet-types/${id}`
        );
        setLogsheetType(res.data);
      } catch (err) {
        console.error("Error fetching logsheet type:", err);
        setError("Failed to load logsheet type data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogsheetType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogsheetType((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `http://localhost:8080/api/logsheet-types/${id}`,
        logsheetType
      );
      alert("Logsheet type updated successfully!");
      // FIX APPLIED HERE: Navigate to the correct list path
      navigate("/logsheet/logsheet-type");
    } catch (err) {
      console.error("Error updating logsheet type:", err);
      alert("Failed to update logsheet type.");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading logsheet type...
      </p>
    );
  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </p>
    );

  return (
    <LogsheetTypeForm
      logsheetType={logsheetType}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Logsheet Type"
      buttonLabel="Save"
    />
  );
};

export default EditLogsheetType;
