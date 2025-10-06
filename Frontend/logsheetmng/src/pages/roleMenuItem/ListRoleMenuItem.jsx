import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/listRoleMenuItem.css";

const API_BASE = "http://localhost:8080";
const GET_ALL_RMI = `${API_BASE}/api/role-menu-items`;
const DELETE_ALL_FOR_ROLE = (roleId) => `${API_BASE}/api/role-menu-items/role/${roleId}/menu-items`;

export default function ListRoleMenuItem() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await axios.get(GET_ALL_RMI).catch(() => ({ data: [] }));
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setErr("Failed to load role-menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const rmi of data) {
      const rid = rmi?.role?.id;
      if (!rid) continue;
      if (!map.has(rid)) map.set(rid, { role: rmi.role, menuItems: [] });
      if (rmi.menuItem) map.get(rid).menuItems.push(rmi.menuItem);
    }
    return Array.from(map.values()).sort((a, b) =>
      (a.role?.name || "").localeCompare(b.role?.name || "")
    );
  }, [data]);

  const handleDeleteAllForRole = async (roleId) => {
    if (!roleId) return;
    if (!window.confirm("Remove ALL menu items for this role?")) return;
    try {
      setLoading(true);
      await axios.delete(DELETE_ALL_FOR_ROLE(roleId));
      await fetchData();
      alert("All menu items removed for the role.");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rmi-scope">
      <div className="list-container">
        <div className="list-header">
          <h2>Assign Menu Items to Role</h2>
          <button className="btn btn-primary" onClick={() => navigate("/staffs/role-menu-item/add")}>
            + Add Mapping
          </button>
        </div>

        {loading && <div className="status">Loading...</div>}
        {err && <div className="error">{err}</div>}

        {!loading && !err && (
          <div className="list-card">
            <table className="list-table">
              <thead>
                <tr>
                  <th style={{ width: "22%" }}>Role</th>
                  <th>Menu Items</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped.length === 0 ? (
                  <tr><td colSpan="3" className="empty">No mappings found.</td></tr>
                ) : (
                  grouped.map(({ role, menuItems }) => (
                    <tr key={role.id}>
                      <td><strong>{role.name}</strong></td>
                      <td>{menuItems?.length ? menuItems.map(mi => mi.title).join(", ") : <em>— None —</em>}</td>
                      <td className="actions">
                        <button className="btn" onClick={() => navigate(`/staffs/role-menu-item/edit/${role.id}`)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteAllForRole(role.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

}
