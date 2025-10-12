import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "../../../styles/sectionEdit.css";

const BASE = "http://localhost:8080";

const EditSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [data, setData] = useState({ sectionName: "", subjectId: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`${BASE}/sections/get/${id}`),
      api.get(`${BASE}/subjects/all`),
    ])
      .then(([secRes, subRes]) => {
        const s = secRes.data;
        setData({
          sectionName: s.sectionName || "",
          subjectId: s.subjectId || "",
        });
        setSubjects(subRes.data || []);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${BASE}/sections/update/${id}`, {
        id,
        sectionName: data.sectionName.trim(),
        subjectId: data.subjectId,
      });
      alert("Section updated!");
      navigate("/modules/section");
    } catch {
      alert("Update failed");
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
        <Card.Header>Edit Section</Card.Header>
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
                placeholder="Section name"
                maxLength={100}
                required
              />
            </Form.Group>
            <div className="form-actions">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditSection;
