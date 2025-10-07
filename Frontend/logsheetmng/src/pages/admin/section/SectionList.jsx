import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Spinner, Form } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../../styles/sectionList.css";

const BASE = "http://localhost:8080";

const SectionList = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE}/sections/all`),
      axios.get(`${BASE}/subjects/all`)
    ])
      .then(([secRes, subRes]) => {
        setSections(secRes.data || []);
        setSubjects(subRes.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const subjectName = (id) => subjects.find((s) => String(s.id) === String(id))?.subjectName || "-";

  const filtered = useMemo(() => {
    if (!subjectFilter) return sections;
    return sections.filter((s) => String(s.subjectId) === String(subjectFilter));
  }, [sections, subjectFilter]);

  const handleEdit = (id) => navigate(`/modules/section/edit/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this section? It may affect topics.")) return;
    try {
      await axios.delete(`${BASE}/sections/delete/${id}`);
      setSections((arr) => arr.filter((x) => x.id !== id));
      alert("Deleted");
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="list-container"><Spinner animation="border" /></div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Sections</h2>
        <div className="list-actions">
          <Form.Select
            size="sm"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.subjectName}</option>)}
          </Form.Select>
          <Button onClick={() => navigate("/modules/section/add")}>+ Add</Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p>No sections found.</p>
      ) : (
        <Table striped bordered hover responsive className="list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Section Name</th>
              <th>Subject</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sec, idx) => (
              <tr key={sec.id}>
                <td>{idx + 1}</td>
                <td>{sec.sectionName}</td>
                <td>{subjectName(sec.subjectId)}</td>
                <td className="actions">
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(sec.id)}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(sec.id)}>
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

export default SectionList;
