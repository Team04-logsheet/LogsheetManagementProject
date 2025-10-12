import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Card, Form } from "react-bootstrap";
import "../../../styles/subjectAdd.css";

const BASE = "http://localhost:8080";

const AddSubject = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ subjectName: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${BASE}/subjects/create`, data);
      alert("Subject created!");
      navigate("/modules/subject");
    } catch (e) {
      alert("Failed to create subject");
    }
  };

  return (
    <div className="form-wrap">
      <Card className="form-card">
        <Card.Header>Add Subject</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                name="subjectName"
                value={data.subjectName}
                onChange={handleChange}
                placeholder="e.g., Mathematics"
                maxLength={100}
                required
              />
            </Form.Group>
            <div className="form-actions">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddSubject;
