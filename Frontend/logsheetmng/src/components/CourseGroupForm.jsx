import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/listPage.css"; 

const CourseGroupForm = ({
  courseGroup,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [selectedGroups, setSelectedGroups] = useState(
    Array.isArray(courseGroup.groupIds) ? courseGroup.groupIds.map(Number) : []
  );

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courseRes, groupRes] = await Promise.all([
          axios.get("http://localhost:8080/api/courses"),
          axios.get("http://localhost:8080/api/groups"),
        ]);
        setCourses(courseRes.data || []);
        setGroups(groupRes.data || []);
      } catch (err) {
        console.error("Error loading dropdown data:", err);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    setSelectedGroups(Array.isArray(courseGroup.groupIds) ? courseGroup.groupIds.map(Number) : []);
  }, [courseGroup.groupIds]);

  const handleGroupChange = (e) => {
    if (e.target.selectedOptions) {
      const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
      setSelectedGroups(selected);
      handleChange({ target: { name: "groupIds", value: selected } });
    } else {
      const value = Number(e.target.value);
      let updated = selectedGroups.includes(value)
        ? selectedGroups.filter((id) => id !== value)
        : [...selectedGroups, value];
      setSelectedGroups(updated);
      handleChange({ target: { name: "groupIds", value: updated } });
    }
  };

  const onCancel = () => {
    navigate("/groups/course-group");
  };

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="courseSelect">
          <Form.Label>Course:</Form.Label>
          <Form.Select
            name="courseId"
            value={courseGroup.courseId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="groupSelect">
          <Form.Label>Assign Groups:</Form.Label>
          <Form.Select
            multiple
            name="groupIds"
            value={selectedGroups}
            onChange={handleGroupChange}
            required
            size={Math.min(8, groups.length || 4)}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple groups.
          </Form.Text>
        </Form.Group>

        <div className="button-group d-flex gap-2">
          <Button variant="primary" type="submit">
            {buttonLabel}
          </Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseGroupForm;
