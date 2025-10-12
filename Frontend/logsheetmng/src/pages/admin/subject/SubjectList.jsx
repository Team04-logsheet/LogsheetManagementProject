import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Table, Spinner } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../../styles/subjectList.css";

const BASE = "http://localhost:8080";

const SubjectList = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`${BASE}/subjects/all`)
      .then((r) => {
        setSubjects(r.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch subjects");
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => navigate(`/modules/subject/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject? It may affect sections/topics."))
      return;
    try {
      await api.delete(`${BASE}/subjects/delete/${id}`);
      setSubjects((arr) => arr.filter((x) => x.id !== id));
      alert("Deleted");
    } catch (e) {
      alert("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="list-container">
        <Spinner animation="border" />
      </div>
    );
  if (error) return <div className="list-container error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Subjects</h2>
        <Button onClick={() => navigate("/modules/subject/add")}>+ Add</Button>
      </div>

      {subjects.length === 0 ? (
        <p>No subjects yet.</p>
      ) : (
        <Table striped bordered hover responsive className="list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject Name</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, idx) => (
              <tr key={s.id}>
                <td>{idx + 1}</td>
                <td>{s.subjectName}</td>
                <td className="actions">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(s.id)}
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(s.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SubjectList;
