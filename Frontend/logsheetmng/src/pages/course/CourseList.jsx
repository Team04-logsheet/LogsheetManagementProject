import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Button, Table } from "react-bootstrap";
import { FaInfoCircle, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses.");
        setLoading(false);
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleEdit = (id) => {
    navigate(`/courses/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`http://localhost:8080/api/courses/${id}`);
        alert("Course deleted successfully!");
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/courses/${id}`);
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Courses</h2>
        <Button variant="primary" onClick={() => navigate("/courses/add")}>
          + Add New
        </Button>
      </div>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Course Name</th>
              <th>Batch Cycle</th>
              <th>Course Type</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.batchCycleTitle}</td>
                <td>{course.courseTypeTitle}</td>
                <td>{course.premiseTitle}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(course.id)}
                    className="me-2"
                  >
                    <FaInfoCircle />
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(course.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CourseList;
