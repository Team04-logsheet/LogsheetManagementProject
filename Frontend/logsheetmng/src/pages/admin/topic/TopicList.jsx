import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Spinner, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import "../../../styles/topicList.css";

const BASE = "http://localhost:8080";

const TopicList = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE}/topics/all`),
      axios.get(`${BASE}/sections/all`),
      axios.get(`${BASE}/subjects/all`)
    ])
      .then(([t, s, sub]) => {
        setTopics(t.data || []);
        setSections(s.data || []);
        setSubjects(sub.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const subjectName = (id) => subjects.find((x) => String(x.id) === String(id))?.subjectName || "-";
  const sectionName = (id) => sections.find((x) => String(x.id) === String(id))?.sectionName || "-";
  const subjectIdOfSection = (sectionId) => sections.find((x) => String(x.id) === String(sectionId))?.subjectId;

  // dependent filters
  const filteredSections = useMemo(() => {
    if (!subjectFilter) return sections;
    return sections.filter((s) => String(s.subjectId) === String(subjectFilter));
  }, [sections, subjectFilter]);

  const filteredTopics = useMemo(() => {
    let arr = topics;
    if (subjectFilter) {
      arr = arr.filter((t) => String(subjectIdOfSection(t.sectionId)) === String(subjectFilter));
    }
    if (sectionFilter) {
      arr = arr.filter((t) => String(t.sectionId) === String(sectionFilter));
    }
    return arr;
  }, [topics, subjectFilter, sectionFilter, sections]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await axios.delete(`${BASE}/topics/delete/${id}`);
      setTopics((arr) => arr.filter((x) => x.id !== id));
      alert("Deleted");
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="list-container"><Spinner animation="border" /></div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>Topics</h2>
        <div className="list-actions">
          <Form.Select
            size="sm"
            value={subjectFilter}
            onChange={(e) => { setSubjectFilter(e.target.value); setSectionFilter(""); }}
          >
            <option value="">All Subjects</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.subjectName}</option>)}
          </Form.Select>
          <Form.Select
            size="sm"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="">All Sections</option>
            {filteredSections.map((sec) => <option key={sec.id} value={sec.id}>{sec.sectionName}</option>)}
          </Form.Select>
          <Button onClick={() => navigate("/modules/topic/add")}>+ Add</Button>
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <p>No topics found.</p>
      ) : (
        <Table striped bordered hover responsive className="list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Topic</th>
              <th>Section</th>
              <th>Subject</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((t, idx) => {
              const sec = sections.find((s) => String(s.id) === String(t.sectionId));
              const subjName = subjectName(sec?.subjectId);
              return (
                <tr key={t.id}>
                  <td>{idx + 1}</td>
                  <td>{t.topicName}</td>
                  <td>{sectionName(t.sectionId)}</td>
                  <td>{subjName}</td>
                  <td className="actions">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(t.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TopicList;
