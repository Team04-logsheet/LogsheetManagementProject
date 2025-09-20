import { Form, Row, Col } from "react-bootstrap";

const FormInputField = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <Row className="mb-3">
      <Form.Group as={Col} controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </Form.Group>
    </Row>
  );
};

export default FormInputField;
