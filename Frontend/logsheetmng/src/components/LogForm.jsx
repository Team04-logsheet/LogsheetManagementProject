import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";

const LogForm = ({
  log,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();

  // State for dropdown options
  const [staffs, setStaffs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [logsheetTypes, setLogsheetTypes] = useState([]);

  useEffect(() => {
    // Fetch all necessary data for dropdowns
    const fetchData = async () => {
      try {
        // Using Promise.all to fetch concurrently
        const [staffRes, courseRes, moduleRes, topicRes, logsheetTypeRes] =
          await Promise.all([
            axios.get("http://localhost:8080/api/staffs"),
            axios.get("http://localhost:8080/api/courses"), // Assuming these endpoints exist
            axios.get("http://localhost:8080/api/modules"),
            axios.get("http://localhost:8080/topics/all"),
            axios.get("http://localhost:8080/api/logsheet-types"),
          ]);
        setStaffs(staffRes.data);
        setCourses(courseRes.data);
        setModules(moduleRes.data);
        setTopics(topicRes.data);
        setLogsheetTypes(logsheetTypeRes.data);
      } catch (err) {
        console.error("Failed to fetch data for form dropdowns:", err);
        alert("Failed to load required data for the form.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Dropdowns are kept as is, since they are Form.Select */}
        <Form.Group className="mb-3">
          <Form.Label>Staff Member:</Form.Label>
          <Form.Select
            name="staffId"
            value={log.staffId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Staff Member</option>
            {staffs.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.firstName} {staff.lastName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Course:</Form.Label>
          <Form.Select
            name="courseId"
            value={log.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Module:</Form.Label>
          <Form.Select
            name="moduleId"
            value={log.moduleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Module</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Topic:</Form.Label>
          <Form.Select
            name="topicId"
            value={log.topicId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Topic</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.topicName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Logsheet Type:</Form.Label>
          <Form.Select
            name="logsheetTypeId"
            value={log.logsheetTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Logsheet Type</option>
            {logsheetTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Using the reusable component for text areas */}
        <FormInputField
          id="formExtraTopics"
          label="Extra Topics Covered:"
          as="textarea"
          rows={3}
          name="extraTopicsCovered"
          value={log.extraTopicsCovered}
          onChange={handleChange}
        />

        <FormInputField
          id="formTaskAssign"
          label="Task/Assignment Given:"
          as="textarea"
          rows={3}
          name="taskAssignGiven"
          value={log.taskAssignGiven}
          onChange={handleChange}
        />

        <FormInputField
          id="formDescription"
          label="Description:"
          as="textarea"
          rows={3}
          name="description"
          value={log.description}
          onChange={handleChange}
        />

        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/logs")}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogForm;
