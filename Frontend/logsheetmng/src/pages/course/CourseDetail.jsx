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
import "../../styles/listPage.css";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for course and assigned modules
  const [course, setCourse] = useState(null);
  const [assignedModules, setAssignedModules] = useState([]);

  // State for course coordinator
  const [courseCoordinator, setCourseCoordinator] = useState(null);

  // State for the "Add Module" modal
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [allModules, setAllModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  // State for the "Assign Coordinator" modal
  const [showCoordinatorModal, setShowCoordinatorModal] = useState(false);
  const [allActiveStaffs, setAllActiveStaffs] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);

  // General loading and error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch Course, Assigned Modules, and Coordinator Data ---
  useEffect(() => {
    const fetchCourseAndAssignmentsData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [courseResult, assignedModulesResult, courseCoordinatorResult] =
          await Promise.allSettled([
            axios.get(`http://localhost:8080/api/courses/${id}`),
            axios.get(`http://localhost:8080/api/course-modules/course/${id}`),
            axios.get(
              `http://localhost:8080/api/course-coordinators/course/${id}`
            ), // Fetch coordinator
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

        // Handle course coordinator data
        if (courseCoordinatorResult.status === "fulfilled") {
          // A course can have multiple coordinators but we want the currently active one
          const activeCoordinator = courseCoordinatorResult.value.data.find(
            (cc) => cc.isActive
          );
          setCourseCoordinator(activeCoordinator || null);
        } else {
          console.warn(
            "Could not fetch course coordinator, treating as none.",
            courseCoordinatorResult.reason
          );
          setCourseCoordinator(null);
        }
      } catch (err) {
        console.error("Error in fetching course details and assignments:", err);
        setError("An unexpected error occurred while loading course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndAssignmentsData();
  }, [id]);

  // --- 2. Handlers for Module Modal and Assignments ---

  // Fetch all available modules when the modal is opened
  const handleShowModuleModal = async () => {
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
      setShowModuleModal(true);
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
      setShowModuleModal(false);
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

  // --- 3. Handlers for Coordinator Modal and Assignment ---

  const handleShowCoordinatorModal = async () => {
    try {
      // 1. Fetch active staff and active coordinators in parallel
      const [staffResponse, activeCoordinatorsResponse] = await Promise.all([
        axios.get("http://localhost:8080/api/staffs/active"),
        axios.get("http://localhost:8080/api/course-coordinators/active"),
      ]);

      const allActiveStaff = staffResponse.data;
      const activeCoordinators = activeCoordinatorsResponse.data;

      // 2. Create a Set of staff IDs who are active coordinators for fast lookups
      const activeCoordinatorStaffIds = new Set(
        activeCoordinators.map((assignment) => assignment.staffId)
      );

      // 3. Add an 'isAvailable' flag to each staff member instead of filtering the list
      const staffWithAvailability = allActiveStaff.map((staff) => {
        const isCurrentlyAssignedToThisCourse =
          courseCoordinator && staff.id === courseCoordinator.staffId;

        // A staff member is available if they are not an active coordinator,
        // OR if they are the coordinator for THIS course.
        const isAvailable =
          !activeCoordinatorStaffIds.has(staff.id) ||
          isCurrentlyAssignedToThisCourse;

        return { ...staff, isAvailable };
      });

      // 4. Set the enriched list to state and open the modal
      setAllActiveStaffs(staffWithAvailability);
      setSelectedCoordinator(
        courseCoordinator ? courseCoordinator.staffId : null
      );
      setShowCoordinatorModal(true);
    } catch (err) {
      console.error("Failed to fetch data for coordinator modal:", err);
      alert("Could not load staff members.");
    }
  };

  const handleCoordinatorSelect = (e) => {
    setSelectedCoordinator(parseInt(e.target.value, 10));
  };

  const handleAssignCoordinator = async () => {
    if (!selectedCoordinator) {
      alert("Please select a staff member to assign as coordinator.");
      return;
    }

    try {
      // Deactivate existing coordinator if any
      if (courseCoordinator) {
        await axios.put(
          `http://localhost:8080/api/course-coordinators/deactivate`,
          {
            courseId: course.id,
            staffId: courseCoordinator.staffId,
          }
        );
      }

      // Assign the new coordinator
      const payload = {
        courseId: course.id,
        staffId: selectedCoordinator,
      };
      const response = await axios.post(
        "http://localhost:8080/api/course-coordinators",
        payload
      );

      // Update the course coordinator state
      setCourseCoordinator(response.data);

      alert("Course coordinator assigned successfully!");
      setShowCoordinatorModal(false);
      setSelectedCoordinator(null); // Clear selection
    } catch (error) {
      console.error("Error assigning course coordinator:", error);
      alert("Failed to assign course coordinator.");
    }
  };

  const handleDeleteCoordinator = async () => {
    if (
      window.confirm("Are you sure you want to remove this course coordinator?")
    ) {
      try {
        await axios.put(
          `http://localhost:8080/api/course-coordinators/deactivate`,
          {
            courseId: course.id,
            staffId: courseCoordinator.staffId,
          }
        );
        setCourseCoordinator(null); // Clear coordinator from state
        alert("Course coordinator removed successfully!");
      } catch (error) {
        console.error("Error removing course coordinator:", error);
        alert("Failed to remove course coordinator.");
      }
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!course) return <Alert variant="warning">Course not found.</Alert>;

  // --- 4. Render Component UI ---
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

        {/* Course Coordinator Section */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h4>Course Coordinator</h4>
          <Button variant="info" onClick={handleShowCoordinatorModal}>
            <FaUserPlus className="me-2" />{" "}
            {courseCoordinator ? "Change Coordinator" : "Assign Coordinator"}
          </Button>
        </div>

        <Card className="mb-4">
          <ListGroup variant="flush">
            {courseCoordinator ? (
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>
                  <FaUserTie className="me-2" /> {courseCoordinator.staffName}{" "}
                  (Active)
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDeleteCoordinator}
                >
                  <FaTrash /> Remove
                </Button>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>No coordinator assigned.</ListGroup.Item>
            )}
          </ListGroup>
        </Card>

        {/* Assigned Modules Section */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h4>Assigned Modules</h4>
          <Button variant="success" onClick={handleShowModuleModal}>
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
        show={showModuleModal}
        onHide={() => setShowModuleModal(false)}
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
          <Button variant="secondary" onClick={() => setShowModuleModal(false)}>
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

      {/* Modal for Assigning Course Coordinator */}
      <Modal
        show={showCoordinatorModal}
        onHide={() => setShowCoordinatorModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Coordinator for "{course.name}"</Modal.Title>
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
                    // CHANGED: Label now indicates availability
                    label={`${staff.firstName} ${staff.lastName} ${
                      !staff.isAvailable ? "(Not Available)" : ""
                    }`}
                    name="coordinatorRadio"
                    value={staff.id}
                    checked={selectedCoordinator === staff.id}
                    onChange={handleCoordinatorSelect}
                    // CHANGED: Radio button is disabled if staff is not available
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
          <Button
            variant="secondary"
            onClick={() => setShowCoordinatorModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAssignCoordinator}
            disabled={!selectedCoordinator}
          >
            {courseCoordinator ? "Change Coordinator" : "Assign Coordinator"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourseDetail;
