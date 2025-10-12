import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";
import api from "../utils/api";

const CourseForm = ({
  course,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();
  const [batchCycles, setBatchCycles] = useState([]);
  const [premises, setPremises] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [batchCyclesRes, premisesRes, courseTypesRes] = await Promise.all(
          [
            api.get("http://localhost:8080/api/batch-cycles"),
            api.get("http://localhost:8080/api/premises"),
            api.get("http://localhost:8080/api/course-types"),
          ]
        );
        setBatchCycles(batchCyclesRes.data);
        setPremises(premisesRes.data);
        setCourseTypes(courseTypesRes.data);
      } catch (err) {
        console.error("Failed to fetch dropdown data:", err);
      }
    };
    fetchDropdownData();
  }, []);

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit}>
        <FormInputField
          id="formName"
          label="Course Name:"
          type="text"
          name="name"
          value={course.name}
          onChange={handleChange}
          required
        />
        <Form.Group className="mb-3">
          <Form.Label>Batch Cycle:</Form.Label>
          <Form.Select
            name="batchCycleId"
            value={course.batchCycleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Batch Cycle</option>
            {batchCycles.map((bc) => (
              <option key={bc.id} value={bc.id}>
                {bc.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location (Premises):</Form.Label>
          <Form.Select
            name="premiseId"
            value={course.premiseId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Location</option>
            {premises.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Type:</Form.Label>
          <Form.Select
            name="courseTypeId"
            value={course.courseTypeId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Course Type</option>
            {courseTypes.map((ct) => (
              <option key={ct.id} value={ct.id}>
                {ct.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <FormInputField
          id="formDescription"
          label="Description:"
          type="textarea"
          name="description"
          value={course.description}
          onChange={handleChange}
        />
        <FormInputField
          id="formStartDate"
          label="Start Date:"
          type="date"
          name="startDate"
          value={course.startDate}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formEndDate"
          label="End Date:"
          type="date"
          name="endDate"
          value={course.endDate}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/courses")}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
