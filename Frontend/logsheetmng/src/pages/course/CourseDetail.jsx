import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, ListGroup } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import "../../styles/listPage.css"; // Reuse the same container style

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${id}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load course details.");
        setLoading(false);
        console.error("Error fetching course details:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Course Details</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Back
        </Button>
      </div>
      <Card>
        <Card.Header as="h5">{course.name}</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Description:</strong> {course.description || "N/A"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Start Date:</strong> {course.startDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>End Date:</strong> {course.endDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Batch Cycle:</strong> {course.batchCycleTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course Type:</strong> {course.courseTypeTitle}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Location:</strong> {course.premiseTitle}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CourseDetail;
