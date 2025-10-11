import { Form, Row, Col } from "react-bootstrap";

const FormInputField = ({
  id,
  label,
  type = "text",
  as = "input", // New prop: defaults to a standard input
  rows, // New prop: for textarea rows
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <Row className="mb-3">
      <Form.Group as={Col} controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={as === "textarea" ? undefined : type} // type isn't used for textarea
          as={as}
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
      </Form.Group>
    </Row>
  );
};

export default FormInputField;
