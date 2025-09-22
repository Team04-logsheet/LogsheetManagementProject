import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";

const PremisesForm = ({
  premises,
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
          value={premises.title}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formAddress"
          label="Address:"
          type="text"
          name="address"
          value={premises.address}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formDescription"
          label="Description:"
          type="text"
          name="description"
          value={premises.description}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/courses/premises")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PremisesForm;
