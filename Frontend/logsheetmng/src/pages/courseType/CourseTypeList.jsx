import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const CourseTypeList = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/course-types")
      .then((response) => {
        setCourseTypes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch course types.");
        setLoading(false);
        console.error("Error fetching course types:", err);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/courses/course-type/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course type?")) {
      try {
        await axios.delete(`http://localhost:8080/api/course-types/${id}`);
        alert("Course type deleted successfully!");
        setCourseTypes(courseTypes.filter((ct) => ct.id !== id));
      } catch (error) {
        console.error("Error deleting course type:", error);
        alert("Failed to delete course type.");
      }
    }
  };

  if (loading) return <p>Loading course types...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Course Types</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/courses/course-type/add")}
        >
          + Add New
        </Button>
      </div>

      {courseTypes.length === 0 ? (
        <p>No course types available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseTypes.map((courseType, index) => (
              <tr key={courseType.id}>
                <td>{index + 1}</td>
                <td>{courseType.title}</td>
                <td>{courseType.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(courseType.id)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(courseType.id)}
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

export default CourseTypeList;
