import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";

const MenuItemForm = ({
  menuItem,
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
          value={menuItem.title}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formDescription"
          label="Description:"
          type="text"
          name="description"
          value={menuItem.description}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formBackendApiUrlPath"
          label="Backend API Path:"
          type="text"
          name="backendApiUrlPath"
          value={menuItem.backendApiUrlPath}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formFrontendPageUrl"
          label="Frontend Page URL:"
          type="text"
          name="frontendPageUrl"
          value={menuItem.frontendPageUrl}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/staffs/menu-item")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MenuItemForm;
