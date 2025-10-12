import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "../../../styles/topicAdd.css";

const BASE = "http://localhost:8080";

const AddTopic = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subjectId, setSubjectId] = useState("");
  const [data, setData] = useState({ topicName: "", sectionId: "" });

  useEffect(() => {
    Promise.all([
      api.get(`${BASE}/subjects/all`),
      api.get(`${BASE}/sections/all`),
    ])
      .then(([subRes, secRes]) => {
        setSubjects(subRes.data || []);
        setSections(secRes.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredSections = useMemo(() => {
    if (!subjectId) return sections;
    return sections.filter((s) => String(s.subjectId) === String(subjectId));
  }, [sections, subjectId]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${BASE}/topics/create`, {
        topicName: data.topicName.trim(),
        sectionId: data.sectionId,
      });
      alert("Topic created!");
      navigate("/modules/topic");
    } catch {
      alert("Failed to create topic");
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
        <Card.Header>Add Topic</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  setData({ ...data, sectionId: "" });
                }}
              >
                <option value="">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subjectName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Select
                name="sectionId"
                value={data.sectionId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Section --</option>
                {filteredSections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.sectionName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Topic Name</Form.Label>
              <Form.Control
                name="topicName"
                value={data.topicName}
                onChange={handleChange}
                placeholder="e.g., Quadratic Equations"
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

export default AddTopic;
