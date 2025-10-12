import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";
// It's good practice to use a consistent CSS file for similar list pages
import "../../styles/courseCoordinatorList.css";

const API_BASE = "http://localhost:8080";

const API_URLS = {
  GET_ALL: `${API_BASE}/api/module-routers`,
  DEACTIVATE: `${API_BASE}/api/module-routers/deactivate`,
  DELETE_BY_ID: (id) => `${API_BASE}/api/module-routers/${id}`,
};

export default function ModuleRouterList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [sortByActive, setSortByActive] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await api.get(API_URLS.GET_ALL);
      setRows(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.message || "Failed to load module routers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedRows = useMemo(() => {
    const sorted = [...rows];
    if (sortByActive) {
      // Sorts active (true) before inactive (false)
      sorted.sort((a, b) => {
        if (a.isActive !== b.isActive) {
          return b.isActive - a.isActive;
        }
        return (a.moduleTitle || "").localeCompare(b.moduleTitle || "");
      });
    } else {
      // Default sort by module title, then staff name
      sorted.sort(
        (a, b) =>
          (a.moduleTitle || "").localeCompare(b.moduleTitle || "") ||
          (a.staffName || "").localeCompare(b.staffName || "")
      );
    }
    return sorted;
  }, [rows, sortByActive]);

  const handleDeactivate = async (row) => {
    if (!row.isActive) {
      alert(`${row.staffName} is already inactive for this module.`);
      return;
    }
    if (
      !window.confirm(
        `Deactivate ${row.staffName} for module "${row.moduleTitle}"?`
      )
    ) {
      return;
    }
    try {
      setLoading(true);
      await api.put(API_URLS.DEACTIVATE, {
        moduleId: row.moduleId,
        staffId: row.staffId,
      });
      await fetchData();
      alert("Router deactivated successfully.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to deactivate router.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (
      !window.confirm(
        `Permanently delete this router mapping?\nModule: ${row.moduleTitle}\nStaff: ${row.staffName}`
      )
    ) {
      return;
    }
    try {
      setLoading(true);
      await api.delete(API_URLS.DELETE_BY_ID(row.id));
      await fetchData();
      alert("Router deleted successfully.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to delete router.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-scope">
      <div className="cc-list-container">
        <div className="cc-list-header">
          <h2>Module Routers</h2>
          <div className="cc-header-actions">
            <button
              className="cc-btn cc-btn-secondary"
              onClick={() => setSortByActive(!sortByActive)}
            >
              {sortByActive ? "Sort Alphabetically" : "Sort by Status"}
            </button>
          </div>
        </div>

        {loading && <div className="cc-status">Loading…</div>}
        {err && <div className="cc-error">{err}</div>}

        <div className="cc-list-card">
          <table className="cc-list-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Module</th>
                <th>Staff (Router)</th>
                <th style={{ width: 120 }}>Status</th>
                <th className="cc-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 ? (
                <tr>
                  <td colSpan="5" className="cc-empty">
                    No module routers found.
                  </td>
                </tr>
              ) : (
                sortedRows.map((row, idx) => (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td>{row.moduleTitle}</td>
                    <td>{row.staffName}</td>
                    <td>
                      <span
                        className={`cc-badge ${
                          row.isActive ? "cc-badge-success" : "cc-badge-muted"
                        }`}
                      >
                        {row.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="cc-actions">
                      <button
                        className="cc-btn cc-btn-warn"
                        onClick={() => handleDeactivate(row)}
                        disabled={!row.isActive}
                      >
                        Deactivate
                      </button>
                      <button
                        className="cc-btn cc-btn-danger"
                        onClick={() => handleDelete(row)}
                      >
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
