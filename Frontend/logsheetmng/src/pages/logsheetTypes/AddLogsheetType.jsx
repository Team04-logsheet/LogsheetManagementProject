import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLogsheetType = () => {
  const navigate = useNavigate();
  const [logsheetType, setLogsheetType] = useState({
    title: "",
    description: "",
    percentTheory: 0,
    percentPractical: 0,
    topicRequired: false,
    groupRequired: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLogsheetType({
      ...logsheetType,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/logsheet-types", logsheetType);
      alert("Logsheet type created successfully!");
      navigate("/logsheet/logsheet-type");
    } catch (error) {
      console.error("Error creating logsheet type:", error);
      alert("Failed to create logsheet type.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Logsheet Type</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={logsheetType.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={logsheetType.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">% Hours for Theory</label>
          <input
            type="number"
            name="percentTheory"
            value={logsheetType.percentTheory}
            onChange={handleChange}
            className="form-control"
            min="0"
            max="100"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">% Hours for Practical</label>
          <input
            type="number"
            name="percentPractical"
            value={logsheetType.percentPractical}
            onChange={handleChange}
            className="form-control"
            min="0"
            max="100"
          />
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="topicRequired"
            checked={logsheetType.topicRequired}
            onChange={handleChange}
          />
          <label className="form-check-label">Topics Required</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="groupRequired"
            checked={logsheetType.groupRequired}
            onChange={handleChange}
          />
          <label className="form-check-label">Groups Required</label>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Create
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/logsheet/logsheet-type")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddLogsheetType;
