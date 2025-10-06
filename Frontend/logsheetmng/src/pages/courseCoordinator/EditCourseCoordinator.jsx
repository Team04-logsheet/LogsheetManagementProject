import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/editCourseCoordinator.css";

const API_BASE = "http://localhost:8080";
const GET_ALL      = `${API_BASE}/api/course-coordinators`;
const DELETE_BY_ID = (id) => `${API_BASE}/api/course-coordinators/${id}`;
const ASSIGN       = `${API_BASE}/api/course-coordinators`;
const DEACTIVATE   = `${API_BASE}/api/course-coordinators/deactivate`;
const GET_COURSES  = `${API_BASE}/api/courses`;
const GET_STAFFS   = `${API_BASE}/api/staffs`;

export default function EditCourseCoordinator() {
  const { id } = useParams(); // coordinator id
  const navigate = useNavigate();

  const [original, setOriginal] = useState(null); // {id, courseId, courseName, staffId, staffFirstName, isActive}
  const [courses, setCourses] = useState([]);
  const [staffs, setStaffs]   = useState([]);

  const [courseId, setCourseId] = useState("");
  const [staffId, setStaffId]   = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const staffLabel = (s) => `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim() || `Staff #${s.id}`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const [allRes, cRes, sRes] = await Promise.allSettled([
          axios.get(GET_ALL),
          axios.get(GET_COURSES),
          axios.get(GET_STAFFS),
        ]);

        if (cancelled) return;

        const all = allRes.status === "fulfilled" && Array.isArray(allRes.value.data) ? allRes.value.data : [];
        const row = all.find(x => String(x.id) === String(id));
        if (!row) {
          setErr("Coordinator not found.");
        } else {
          setOriginal(row);
          setCourseId(String(row.courseId));
          setStaffId(String(row.staffId));
          setIsActive(!!row.isActive);
        }

        setCourses(cRes.status === "fulfilled" && Array.isArray(cRes.value.data) ? cRes.value.data : []);
        setStaffs( sRes.status === "fulfilled" && Array.isArray(sRes.value.data) ? sRes.value.data : []);
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setErr("Failed to load edit data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const changedCourseOrStaff = useMemo(() => {
    if (!original) return false;
    return String(original.courseId) !== String(courseId) || String(original.staffId) !== String(staffId);
  }, [original, courseId, staffId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!original) return;
    if (!courseId) return alert("Please select a course.");
    if (!staffId)  return alert("Please select a staff.");

    try {
      setLoading(true);

      // Cases:
      // 1) Toggled to inactive (and not changing mapping) -> deactivate
      if (!isActive && !changedCourseOrStaff && original.isActive) {
        await axios.put(DEACTIVATE, { courseId: Number(original.courseId), staffId: Number(original.staffId) });
        alert("Coordinator deactivated.");
        navigate("/staffs/course-coordinator");
        return;
      }

      // 2) Changed mapping OR want to (re)activate -> delete old + create new (active by default)
      if (changedCourseOrStaff || (isActive && !original.isActive)) {
        await axios.delete(DELETE_BY_ID(original.id));
        await axios.post(ASSIGN, { courseId: Number(courseId), staffId: Number(staffId) });

        // If user unchecked Active, immediately deactivate the new mapping
        if (!isActive) {
          await axios.put(DEACTIVATE, { courseId: Number(courseId), staffId: Number(staffId) });
        }
        alert("Coordinator updated.");
        navigate("/staffs/course-coordinator");
        return;
      }

      // 3) Nothing changed → just leave
      alert("No changes to save.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-scope">
      <div className="cc-form-wrap">
        <div className="cc-form-card">
          <div className="cc-card-header">Edit Course Coordinator</div>

          {loading && <div className="cc-status">Loading…</div>}
          {err && <div className="cc-error">{err}</div>}

          <form onSubmit={onSubmit}>
            <div className="cc-card-body">
              <div className="cc-row">
                <label>Course</label>
                <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  <option value="">{courses.length ? "-- Select Course --" : "Loading courses…"}</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="cc-row">
                <label>Coordinator (Staff)</label>
                <select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                  <option value="">{staffs.length ? "-- Select Staff --" : "Loading staff…"}</option>
                  {staffs.map(s => (
                    <option key={s.id} value={s.id}>{staffLabel(s)}</option>
                  ))}
                </select>
              </div>

              <div className="cc-row cc-checkline">
                <label className="cc-checklabel">
                  <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                  <span>Active?</span>
                </label>
                <div className="cc-hint">If you change course/staff or enable Active when inactive, the old mapping is replaced with a new one.</div>
              </div>
            </div>

            <div className="cc-form-actions">
              <button type="submit" className="cc-btn cc-btn-primary" disabled={loading}>Save</button>
              <button type="button" className="cc-btn cc-btn-ghost" onClick={() => navigate("/staffs/course-coordinator")}>
                Cancel
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
