import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";

const CourseTypeForm = ({
  courseType,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit}>
        <FormInputField
          id="formTitle"
          label="Title:"
          type="text"
          name="title"
          value={courseType.title}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formDescription"
          label="Description:"
          type="text"
          name="description"
          value={courseType.description}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/courses/course-type")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseTypeForm;
