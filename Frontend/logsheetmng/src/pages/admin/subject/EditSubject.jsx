import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import "../../../styles/subjectEdit.css";

const BASE = "http://localhost:8080";

const EditSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ subjectName: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${BASE}/subjects/get/${id}`)
      .then((r) => {
        setData({ subjectName: r.data.subjectName || "" });
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load subject");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${BASE}/subjects/update/${id}`, { id, ...data });
      alert("Subject updated!");
      navigate("/modules/subject");
    } catch (e) {
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
        <Card.Header>Edit Subject</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                name="subjectName"
                value={data.subjectName}
                onChange={handleChange}
                placeholder="Subject name"
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

export default EditSubject;
