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
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaUserTie,
  FaUserPlus,
} from "react-icons/fa";
import "../../../styles/listPage.css";

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const [moduleRouter, setModuleRouter] = useState(null);

  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [showRouterModal, setShowRouterModal] = useState(false);
  const [allActiveStaffs, setAllActiveStaffs] = useState([]);

  const [selectedRouter, setSelectedRouter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch Module, Subjects, and Router Data ---
  useEffect(() => {
    const fetchModuleData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [moduleResult, assignedSubjectsResult, moduleRouterResult] =
          await Promise.allSettled([
            axios.get(`http://localhost:8080/api/modules/${id}`),
            axios.get(`http://localhost:8080/api/module-subjects/module/${id}`),
            axios.get(`http://localhost:8080/api/module-routers/module/${id}`), // Fetch router
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
            "Could not fetch assigned subjects.",
            assignedSubjectsResult.reason
          );
          setAssignedSubjects([]);
        }

        // Handle module router data
        if (moduleRouterResult.status === "fulfilled") {
          const activeRouter = moduleRouterResult.value.data.find(
            (router) => router.isActive
          );
          setModuleRouter(activeRouter || null);
        } else {
          console.warn(
            "Could not fetch module router.",
            moduleRouterResult.reason
          );
          setModuleRouter(null);
        }
      } catch (err) {
        console.error("An error occurred while fetching module data:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchModuleData();
  }, [id]);

  // --- 2. Handlers for Subject Modal and Assignments ---
  const handleShowSubjectModal = async () => {
    try {
      const response = await axios.get("http://localhost:8080/subjects/all"); // Assuming this is the correct endpoint
      const assignedSubjectIds = new Set(
        assignedSubjects.map((item) => item.subjectId)
      );
      const availableSubjects = response.data.filter(
        (subject) => !assignedSubjectIds.has(subject.id)
      );
      setAllSubjects(availableSubjects);
      setShowSubjectModal(true);
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

      const updatedSubjectsRes = await axios.get(
        `http://localhost:8080/api/module-subjects/module/${id}`
      );
      setAssignedSubjects(updatedSubjectsRes.data);

      alert("Subjects assigned successfully!");
      setShowSubjectModal(false); // BUG FIX: Was setShowModal
      setSelectedSubjects([]);
    } catch (error) {
      console.error("Error assigning subjects:", error);
      alert("Failed to assign subjects.");
    }
  };

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

  // --- 3. Handlers for Router Modal and Assignment ---

  const handleShowRouterModal = async () => {
    try {
      const [staffResponse, activeRoutersResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/staffs/active"),
        axios.get("http://localhost:8080/api/module-routers/active"),
      ]);

      const allActiveStaff = staffResponse.data;
      const activeRouters = activeRoutersResponse.data;

      const activeRouterStaffIds = new Set(
        activeRouters.map((assignment) => assignment.staffId)
      );

      const staffWithAvailability = allActiveStaff.map((staff) => {
        const isCurrentlyAssignedToThisModule =
          moduleRouter && staff.id === moduleRouter.staffId;

        const isAvailable =
          !activeRouterStaffIds.has(staff.id) ||
          isCurrentlyAssignedToThisModule;

        return { ...staff, isAvailable };
      });

      setAllActiveStaffs(staffWithAvailability);
      setSelectedRouter(moduleRouter ? moduleRouter.staffId : null);
      setShowRouterModal(true);
    } catch (err) {
      console.error("Failed to fetch data for router modal:", err);
      alert("Could not load staff members.");
    }
  };

  const handleRouterSelect = (e) => {
    setSelectedRouter(parseInt(e.target.value, 10));
  };

  const handleAssignRouter = async () => {
    if (!selectedRouter) {
      alert("Please select a staff member to assign as the router.");
      return;
    }
    try {
      if (moduleRouter) {
        await axios.put(`http://localhost:8080/api/module-routers/deactivate`, {
          moduleId: module.id,
          staffId: moduleRouter.staffId,
        });
      }

      const payload = {
        moduleId: module.id,
        staffId: selectedRouter,
      };
      const response = await axios.post(
        "http://localhost:8080/api/module-routers",
        payload
      );
      setModuleRouter(response.data);

      alert("Module router assigned successfully!");
      setShowRouterModal(false);
      setSelectedRouter(null);
    } catch (error) {
      console.error("Error assigning module router:", error);
      alert("Failed to assign module router.");
    }
  };

  const handleDeleteRouter = async () => {
    if (window.confirm("Are you sure you want to remove this module router?")) {
      try {
        await axios.put(`http://localhost:8080/api/module-routers/deactivate`, {
          moduleId: module.id,
          staffId: moduleRouter.staffId,
        });
        setModuleRouter(null);
        alert("Module router removed successfully!");
      } catch (error) {
        console.error("Error removing module router:", error);
        alert("Failed to remove module router.");
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

        {/* Module Router Section */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h4>Module Router</h4>
          <Button variant="info" onClick={handleShowRouterModal}>
            <FaUserPlus className="me-2" />
            {moduleRouter ? "Change Router" : "Assign Router"}
          </Button>
        </div>

        <Card className="mb-4">
          <ListGroup variant="flush">
            {moduleRouter ? (
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>
                  <FaUserTie className="me-2" /> {moduleRouter.staffName}{" "}
                  (Active)
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDeleteRouter}
                >
                  <FaTrash /> Remove
                </Button>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>
                No router assigned to this module.
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>

        {/* Assigned Subjects Section */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h4>Assigned Subjects</h4>
          <Button variant="success" onClick={handleShowSubjectModal}>
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
        show={showSubjectModal} /* BUG FIX: Was showModal */
        onHide={() =>
          setShowSubjectModal(false)
        } /* BUG FIX: Was setShowModal */
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
          <Button
            variant="secondary"
            onClick={() =>
              setShowSubjectModal(false)
            } /* BUG FIX: Was setShowModal */
          >
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

      {/* Modal for Assigning Module Router */}
      <Modal
        show={showRouterModal}
        onHide={() => setShowRouterModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Router for "{module.title}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allActiveStaffs.length > 0 ? (
            <Form>
              <Form.Group>
                <Form.Label>Select an active staff member:</Form.Label>
                {allActiveStaffs.map((staff) => (
                  <Form.Check
                    key={staff.id}
                    type="radio"
                    id={`staff-${staff.id}`}
                    label={`${staff.firstName} ${staff.lastName} ${
                      !staff.isAvailable ? "(Not Available)" : ""
                    }`}
                    name="routerRadio"
                    value={staff.id}
                    checked={selectedRouter === staff.id}
                    onChange={handleRouterSelect}
                    disabled={!staff.isAvailable}
                    className="mb-2"
                  />
                ))}
              </Form.Group>
            </Form>
          ) : (
            <p>No active staff members available to assign.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRouterModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignRouter}
            disabled={!selectedRouter}
          >
            {moduleRouter ? "Change Router" : "Assign Router"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModuleDetail;
