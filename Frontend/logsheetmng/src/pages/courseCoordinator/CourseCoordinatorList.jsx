import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/courseCoordinatorList.css";

const API_BASE = "http://localhost:8080";
const GET_ALL = `${API_BASE}/api/course-coordinators`;
const DELETE_BY_ID = (id) => `${API_BASE}/api/course-coordinators/${id}`;
const DEACTIVATE = `${API_BASE}/api/course-coordinators/deactivate`;

export default function CourseCoordinatorList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await axios.get(GET_ALL);
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.message || "Failed to load coordinators.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) =>
      (a.courseName || "").localeCompare(b.courseName || "") ||
      (a.staffFirstName || "").localeCompare(b.staffFirstName || "")
    );
  }, [rows]);

  const handleDeactivate = async (row) => {
    if (!row?.courseId || !row?.staffId) return;
    if (!row.isActive) return alert("Already inactive.");
    if (!window.confirm(`Deactivate ${row.staffFirstName} for course "${row.courseName}"?`)) return;
    try {
      setLoading(true);
      await axios.put(DEACTIVATE, { courseId: row.courseId, staffId: row.staffId });
      await fetchData();
      alert("Coordinator deactivated.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to deactivate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!row?.id) return;
    if (!window.confirm(`Delete this coordinator mapping?\nCourse: ${row.courseName}\nStaff: ${row.staffFirstName}`)) return;
    try {
      setLoading(true);
      await axios.delete(DELETE_BY_ID(row.id));
      await fetchData();
      alert("Coordinator deleted.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-scope">
      <div className="cc-list-container">
        <div className="cc-list-header">
          <h2>Course Coordinators</h2>
          <button className="cc-btn cc-btn-primary" onClick={() => navigate("/staffs/course-coordinator/add")}>
            + Assign Coordinator
          </button>
        </div>

        {loading && <div className="cc-status">Loading…</div>}
        {err && <div className="cc-error">{err}</div>}

        <div className="cc-list-card">
          <table className="cc-list-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Course</th>
                <th>Staff</th>
                <th style={{ width: 120 }}>Active</th>
                <th className="cc-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan="5" className="cc-empty">No coordinators found.</td></tr>
              ) : (
                sorted.map((row, idx) => (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td>{row.courseName}</td>
                    <td>{row.staffFirstName}</td>
                    <td>
                      <span className={`cc-badge ${row.isActive ? "cc-badge-success" : "cc-badge-muted"}`}>
                        {row.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="cc-actions">
                      <button className="cc-btn" onClick={() => navigate(`/staffs/course-coordinator/edit/${row.id}`)}>
                        Edit
                      </button>
                      <button className="cc-btn cc-btn-warn" onClick={() => handleDeactivate(row)}>
                        Deactivate
                      </button>
                      <button className="cc-btn cc-btn-danger" onClick={() => handleDelete(row)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
