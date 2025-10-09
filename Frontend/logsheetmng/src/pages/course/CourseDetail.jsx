import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  ListGroup,
  Modal,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import "../../styles/listPage.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for course and assigned modules
  const [course, setCourse] = useState(null);
  const [assignedModules, setAssignedModules] = useState([]);

  // State for the "Add Module" modal
  const [showModal, setShowModal] = useState(false);
  const [allModules, setAllModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  // General loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch Course and Assigned Modules Data ---
  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);

      const coursePromise = axios.get(
        `http://localhost:8080/api/courses/${id}`
      );
      const assignedModulesPromise = axios.get(
        `http://localhost:8080/api/course-modules/course/${id}`
      );

      const [courseResult, assignedModulesResult] = await Promise.allSettled([
        coursePromise,
        assignedModulesPromise,
      ]);

      // Handle course data
      if (courseResult.status === "fulfilled") {
        setCourse(courseResult.value.data);
      } else {
        setError("Failed to load course details.");
        console.error("Error fetching course:", courseResult.reason);
        setLoading(false);
        return;
      }

      // Handle assigned modules data
      if (assignedModulesResult.status === "fulfilled") {
        setAssignedModules(assignedModulesResult.value.data);
      } else {
        console.warn(
          "Could not fetch assigned modules, treating as empty.",
          assignedModulesResult.reason
        );
        setAssignedModules([]);
      }

      setLoading(false);
    };
    fetchCourseData();
  }, [id]);

  // --- 2. Handlers for Modal and Assignments ---

  // Fetch all available modules when the modal is opened
  const handleShowModal = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/modules");
      // Filter out modules that are already assigned
      const assignedModuleIds = new Set(
        assignedModules.map((item) => item.moduleId)
      );
      const availableModules = response.data.filter(
        (module) => !assignedModuleIds.has(module.id)
      );
      setAllModules(availableModules);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch modules:", err);
      alert("Could not load modules.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const moduleId = parseInt(value, 10);
    if (checked) {
      setSelectedModules((prev) => [...prev, moduleId]);
    } else {
      setSelectedModules((prev) => prev.filter((id) => id !== moduleId));
    }
  };

  // Handle assigning selected modules to the course
  const handleAssignModules = async () => {
    if (selectedModules.length === 0) {
      alert("Please select at least one module.");
      return;
    }
    try {
      const payload = {
        courseId: course.id,
        moduleIds: selectedModules,
      };
      await axios.post("http://localhost:8080/api/course-modules", payload);

      // Refresh assigned modules list after successful assignment
      const updatedModulesRes = await axios.get(
        `http://localhost:8080/api/course-modules/course/${id}`
      );
      setAssignedModules(updatedModulesRes.data);

      alert("Modules assigned successfully!");
      setShowModal(false);
      setSelectedModules([]);
    } catch (error) {
      console.error("Error assigning modules:", error);
      alert("Failed to assign modules.");
    }
  };

  // Handle deleting a module from the course
  const handleDeleteModule = async (moduleId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this module from the course?"
      )
    ) {
      try {
        await axios.delete(
          `http://localhost:8080/api/course-modules/course/${course.id}/modules/${moduleId}`
        );
        // Remove module from state to update UI instantly
        setAssignedModules(
          assignedModules.filter((item) => item.moduleId !== moduleId)
        );
        alert("Module removed successfully!");
      } catch (error) {
        console.error("Error removing module:", error);
        alert("Failed to remove module.");
      }
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!course) return <Alert variant="warning">Course not found.</Alert>;

  // --- 3. Render Component UI ---
  return (
    <>
      <div className="list-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Course Details</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </div>

        {/* Course Info Card */}
        <Card className="mb-4">
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

        {/* Assigned Modules Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Assigned Modules</h4>
          <Button variant="success" onClick={handleShowModal}>
            <FaPlus className="me-2" /> Add Modules
          </Button>
        </div>

        <Card>
          <ListGroup variant="flush">
            {assignedModules.length > 0 ? (
              assignedModules.map((assignment) => (
                <ListGroup.Item
                  key={assignment.moduleId}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{assignment.moduleTitle}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteModule(assignment.moduleId)}
                  >
                    <FaTrash />
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>
                No modules assigned to this course.
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </div>

      {/* Modal for Adding Modules */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Modules to "{course.name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allModules.length > 0 ? (
            <Form>
              <Row>
                {allModules.map((module) => (
                  <Col md={6} key={module.id} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={`module-${module.id}`}
                      label={module.title}
                      value={module.id}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form>
          ) : (
            <p>No new modules available to add.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignModules}
            disabled={selectedModules.length === 0}
          >
            Assign Selected
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseDetail;
