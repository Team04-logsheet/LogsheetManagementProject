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
import "../../../styles/listPage.css";

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Module and Assigned Subjects Data ---
  useEffect(() => {
    const fetchModuleData = async () => {
      setLoading(true);
      setError(null);

      const modulePromise = axios.get(
        `http://localhost:8080/api/modules/${id}`
      );
      const assignedSubjectsPromise = axios.get(
        `http://localhost:8080/api/module-subjects/module/${id}`
      );

      const [moduleResult, assignedSubjectsResult] = await Promise.allSettled([
        modulePromise,
        assignedSubjectsPromise,
      ]);

      // Handle module data
      if (moduleResult.status === "fulfilled") {
        setModule(moduleResult.value.data);
      } else {
        setError("Failed to load module details.");
        console.error("Error fetching module:", moduleResult.reason);
        setLoading(false);
        return;
      }

      // Handle assigned subjects data
      if (assignedSubjectsResult.status === "fulfilled") {
        setAssignedSubjects(assignedSubjectsResult.value.data);
      } else {
        console.warn(
          "Could not fetch assigned subjects, treating as empty.",
          assignedSubjectsResult.reason
        );
        setAssignedSubjects([]);
      }

      setLoading(false);
    };
    fetchModuleData();
  }, [id]);

  // --- Handlers for Modal and Assignments ---

  // Fetch all available subjects when the modal is opened
  const handleShowModal = async () => {
    try {
      const response = await axios.get("http://localhost:8080/subjects/all");

      console.log("Subjects received from API:", response.data);
      const assignedSubjectIds = new Set(
        assignedSubjects.map((item) => item.subjectId)
      );
      const availableSubjects = response.data.filter(
        (subject) => !assignedSubjectIds.has(subject.id)
      );
      setAllSubjects(availableSubjects);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      alert("Could not load subjects.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const subjectId = parseInt(value, 10);
    if (checked) {
      setSelectedSubjects((prev) => [...prev, subjectId]);
    } else {
      setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
    }
  };

  // Handle assigning selected subjects to the module
  const handleAssignSubjects = async () => {
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }
    try {
      const payload = {
        moduleId: module.id,
        subjectIds: selectedSubjects,
      };
      await axios.post("http://localhost:8080/api/module-subjects", payload);

      // Refresh assigned subjects list
      const updatedSubjectsRes = await axios.get(
        `http://localhost:8080/api/module-subjects/module/${id}`
      );
      setAssignedSubjects(updatedSubjectsRes.data);

      alert("Subjects assigned successfully!");
      setShowModal(false);
      setSelectedSubjects([]);
    } catch (error) {
      console.error("Error assigning subjects:", error);
      alert("Failed to assign subjects.");
    }
  };

  // Handle deleting a subject from the module
  const handleDeleteSubject = async (subjectId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this subject from the module?"
      )
    ) {
      try {
        await axios.delete(
          `http://localhost:8080/api/module-subjects/module/${module.id}/subjects/${subjectId}`
        );
        // Update UI
        setAssignedSubjects(
          assignedSubjects.filter((item) => item.subjectId !== subjectId)
        );
        alert("Subject removed successfully!");
      } catch (error) {
        console.error("Error removing subject:", error);
        alert("Failed to remove subject.");
      }
    }
  };

  if (loading) return <p>Loading module details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!module) return <Alert variant="warning">Module not found.</Alert>;

  // --- Render Component UI ---
  return (
    <>
      <div className="list-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Module Details</h2>
          <Button
            variant="secondary"
            onClick={() => navigate("/modules/module")}
          >
            <FaArrowLeft className="me-2" /> Back
          </Button>
        </div>

        {/* Module Info Card */}
        <Card className="mb-4">
          <Card.Header as="h5">{module.title}</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Description:</strong> {module.description || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Theory Hours:</strong> {module.theoryHours}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Practical Hours:</strong> {module.practicalHours}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Assigned Subjects Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Assigned Subjects</h4>
          <Button variant="success" onClick={handleShowModal}>
            <FaPlus className="me-2" /> Add Subjects
          </Button>
        </div>

        <Card>
          <ListGroup variant="flush">
            {assignedSubjects.length > 0 ? (
              assignedSubjects.map((assignment) => (
                <ListGroup.Item
                  key={assignment.subjectId}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{assignment.subjectName}</span>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteSubject(assignment.subjectId)}
                  >
                    <FaTrash />
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>
                No subjects assigned to this module.
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </div>

      {/* Modal for Adding Subjects */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Subjects to "{module.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allSubjects.length > 0 ? (
            <Form>
              <Row>
                {allSubjects.map((subject) => (
                  <Col md={6} key={subject.id} className="mb-2">
                    <Form.Check
                      type="checkbox"
                      id={`subject-${subject.id}`}
                      // --- THIS IS THE FIX ---
                      // The label must use "subjectName" to match your API's DTO
                      label={subject.subjectName}
                      value={subject.id}
                      onChange={handleCheckboxChange}
                    />
                  </Col>
                ))}
              </Row>
            </Form>
          ) : (
            <p>No new subjects available to add.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignSubjects}
            disabled={selectedSubjects.length === 0}
          >
            Assign Selected
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModuleDetail;
