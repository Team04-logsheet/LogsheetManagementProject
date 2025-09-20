import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../styles/menuItem.css";
import FormInputField from "./FormInputField";

const MenuItemForm = ({
  menuItem,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="menu-item-form-container">
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
          id="formPath"
          label="Path:"
          type="text"
          name="path"
          value={menuItem.path}
          onChange={handleChange}
          required
        />
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/users/menu-item")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MenuItemForm;
