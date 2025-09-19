import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./../styles/batchCycle.css";

const BatchCycleForm = ({
  cycle,
  handleChange,
  handleSubmit,
  formTitle,
  buttonLabel,
}) => {
  const navigate = useNavigate();

  return (
    <div className="batch-cycle-container">
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={cycle.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={cycle.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formStartDate">
            <Form.Label>Start Date:</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={cycle.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEndDate">
            <Form.Label>End Date:</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={cycle.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <div className="button-group">
          <Button variant="primary" type="submit" className="me-2">
            {buttonLabel}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/courses/batch-cycle")}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BatchCycleForm;
