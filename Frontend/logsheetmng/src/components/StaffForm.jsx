import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import api from "../utils/api";
import FormInputField from "./FormInputField";
import "../styles/listPage.css";

const StaffForm = ({
  staff,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/roles");
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
        alert("Failed to load staff data.");
      }
    };
    fetchRoles();
  }, []);

  return (
    <div className="form-container">
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit}>
        <FormInputField
          id="formFirstName"
          label="First Name:"
          type="text"
          name="firstName"
          value={staff.firstName}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formLastName"
          label="Last Name:"
          type="text"
          name="lastName"
          value={staff.lastName}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formEmail"
          label="Email Address:"
          type="email"
          name="email"
          value={staff.email}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formContact"
          label="Contact Number:"
          type="text"
          name="contact"
          value={staff.contact}
          onChange={handleChange}
          required
        />
        <FormInputField
          id="formStaffType"
          label="Staff Type:"
          type="text"
          name="staffType"
          value={staff.staffType}
          onChange={handleChange}
          placeholder="e.g., Teaching, Administrative"
          required
        />
        <Form.Group className="mb-3">
          <Form.Label>Role:</Form.Label>
          <Form.Select
            name="roleId"
            value={staff.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button variant="secondary" onClick={() => navigate("/staffs")}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StaffForm;
