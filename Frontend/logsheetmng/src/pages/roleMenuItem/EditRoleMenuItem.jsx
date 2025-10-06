import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/editRoleMenuItem.css";

const API_BASE = "http://localhost:8080";
const GET_ROLES = `${API_BASE}/api/roles`;
const GET_MENU_ITEMS = `${API_BASE}/api/menu-items`;
const GET_RMI_BY_ROLE = (roleId) => `${API_BASE}/api/role-menu-items/role/${roleId}`;
const DELETE_ALL_FOR_ROLE = (roleId) => `${API_BASE}/api/role-menu-items/role/${roleId}/menu-items`;
const ASSIGN_MENU_ITEMS = `${API_BASE}/api/role-menu-items`;

export default function EditRoleMenuItem() {
  const { roleId } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItemIds, setSelectedMenuItemIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const role = useMemo(
    () => roles.find(r => String(r.id) === String(roleId)),
    [roles, roleId]
  );

  useEffect(() => {
    if (!roleId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [rRes, mRes, mapRes] = await Promise.allSettled([
          axios.get(GET_ROLES),
          axios.get(GET_MENU_ITEMS),
          axios.get(GET_RMI_BY_ROLE(roleId)),
        ]);

        if (cancelled) return;

        setRoles(rRes.status === "fulfilled" && Array.isArray(rRes.value.data) ? rRes.value.data : []);
        setMenuItems(mRes.status === "fulfilled" && Array.isArray(mRes.value.data) ? mRes.value.data : []);

        const ids =
          mapRes.status === "fulfilled" && Array.isArray(mapRes.value.data)
            ? mapRes.value.data.filter(x => x?.menuItem?.id).map(x => String(x.menuItem.id))
            : [];
        setSelectedMenuItemIds(ids);
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
  }, [roleId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!roleId) return;
    try {
      setLoading(true);
      await axios.delete(DELETE_ALL_FOR_ROLE(roleId));
      await axios.post(ASSIGN_MENU_ITEMS, {
        roleId: Number(roleId),
        menuItemIds: selectedMenuItemIds.map(Number),
      });
      alert("Role menu items updated.");
      navigate("/staffs/role-menu-item");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="form-wrap">
    <div className="form-card">
      <div className="card-header">Edit Role Menu Items</div>

      {loading && <div className="status">Loading...</div>}
      {err && <div className="error">{err}</div>}

      <form onSubmit={onSubmit}>
        <div className="card-body">
          <div className="row">
            <label>Role</label>
            <input type="text" value={role?.name || `Role ID: ${roleId}`} disabled />
          </div>

          <div className="row">
            <label>Menu Items (multi-select)</label>
            <select
              multiple
              value={selectedMenuItemIds}
              onChange={(e) => setSelectedMenuItemIds(Array.from(e.target.selectedOptions).map(o => o.value))}
            >
              {menuItems?.map(mi => (
                <option key={mi.id} value={mi.id}>{mi.title}</option>
              ))}
            </select>
            <div className="hint">Hold Ctrl/Cmd to select multiple</div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>Update</button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/staffs/role-menu-item")}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

}
