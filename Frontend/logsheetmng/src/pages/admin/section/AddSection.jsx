import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "../../../styles/sectionAdd.css";

const BASE = "http://localhost:8080";

const AddSection = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ sectionName: "", subjectId: "" });

  useEffect(() => {
    api
      .get(`${BASE}/subjects/all`)
      .then((r) => {
        setSubjects(r.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${BASE}/sections/create`, {
        sectionName: data.sectionName.trim(),
        subjectId: data.subjectId,
      });
      alert("Section created!");
      navigate("/modules/section");
    } catch (e) {
      alert("Failed to create section");
    }
  };

  if (loading)
    return (
      <div className="form-wrap">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="form-wrap">
      <Card className="form-card">
        <Card.Header>Add Section</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                name="subjectId"
                value={data.subjectId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subjectName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section Name</Form.Label>
              <Form.Control
                name="sectionName"
                value={data.sectionName}
                onChange={handleChange}
                placeholder="e.g., Algebra"
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

export default AddSection;
