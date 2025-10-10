import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/addCourseCoordinator.css";

const API_BASE = "http://localhost:8080";
const GET_COURSES = `${API_BASE}/api/courses`;
const GET_STAFFS = `${API_BASE}/api/staffs/active`;
const ASSIGN = `${API_BASE}/api/course-coordinators`;
const DEACTIVATE = `${API_BASE}/api/course-coordinators/deactivate`;

export default function AddCourseCoordinator() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [cRes, sRes] = await Promise.allSettled([
          axios.get(GET_COURSES),
          axios.get(GET_STAFFS),
        ]);

        if (cancelled) return;
        setCourses(
          cRes.status === "fulfilled" && Array.isArray(cRes.value.data)
            ? cRes.value.data
            : []
        );
        setStaffs(
          sRes.status === "fulfilled" && Array.isArray(sRes.value.data)
            ? sRes.value.data
            : []
        );
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setErr("Failed to load dropdown data.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return alert("Please select a course.");
    if (!staffId) return alert("Please select a staff (coordinator).");

    try {
      setLoading(true);
      // Create (defaults to active=true in backend)
      await axios.post(ASSIGN, {
        courseId: Number(courseId),
        staffId: Number(staffId),
      });

      // If user unchecked Active, immediately deactivate the fresh mapping
      if (!isActive) {
        await axios.put(DEACTIVATE, {
          courseId: Number(courseId),
          staffId: Number(staffId),
        });
      }

      alert("Coordinator assigned.");
      navigate("/staffs/course-coordinator");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to assign coordinator.");
    } finally {
      setLoading(false);
    }
  };

  const staffLabel = (s) =>
    `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim() || `Staff #${s.id}`;

  return (
    <div className="cc-scope">
      <div className="cc-form-wrap">
        <div className="cc-form-card">
          <div className="cc-card-header">Assign Course Coordinator</div>

          {err && <div className="cc-error">{err}</div>}
          {loading && <div className="cc-status">Loading…</div>}

          <form onSubmit={onSubmit}>
            <div className="cc-card-body">
              <div className="cc-row">
                <label>Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">
                    {courses.length
                      ? "-- Select Course --"
                      : "Loading courses…"}
                  </option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cc-row">
                <label>Coordinator (Staff)</label>
                <select
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                >
                  <option value="">
                    {staffs.length ? "-- Select Staff --" : "Loading staff…"}
                  </option>
                  {staffs.map((s) => (
                    <option key={s.id} value={s.id}>
                      {staffLabel(s)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cc-row cc-checkline">
                <label className="cc-checklabel">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <span>Active?</span>
                </label>
                <div className="cc-hint">
                  New assignments are active by default; uncheck to create and
                  immediately deactivate.
                </div>
              </div>
            </div>

            <div className="cc-form-actions">
              <button
                type="submit"
                className="cc-btn cc-btn-primary"
                disabled={loading}
              >
                Save
              </button>
              <button
                type="button"
                className="cc-btn cc-btn-ghost"
                onClick={() => navigate("/staffs/course-coordinator")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
