import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/addRoleMenuItem.css";

const API_BASE = "http://localhost:8080";
const GET_ROLES = `${API_BASE}/api/roles`;
const GET_MENU_ITEMS = `${API_BASE}/api/menu-items`;
const ASSIGN_MENU_ITEMS = `${API_BASE}/api/role-menu-items`;

export default function AddRoleMenuItem() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [roleId, setRoleId] = useState("");
  const [selectedMenuItemIds, setSelectedMenuItemIds] = useState([]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const [rRes, mRes] = await Promise.allSettled([
          axios.get(GET_ROLES),
          axios.get(GET_MENU_ITEMS),
        ]);

        if (cancelled) return;

        if (rRes.status === "fulfilled" && Array.isArray(rRes.value.data)) {
          setRoles(rRes.value.data);
        } else {
          setRoles([]);
          setErr((prev) => prev || "Failed to load roles.");
        }
        if (mRes.status === "fulfilled" && Array.isArray(mRes.value.data)) {
          setMenuItems(mRes.value.data);
        } else {
          setMenuItems([]);
          setErr((prev) => prev || "Failed to load menu items.");
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setErr("Failed to load roles/menu items.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!roleId) return alert("Please select a role.");
    if (!selectedMenuItemIds.length) return alert("Please select at least one menu item.");

    try {
      setLoading(true);
      await axios.post(ASSIGN_MENU_ITEMS, {
        roleId: Number(roleId),
        menuItemIds: selectedMenuItemIds.map(Number),
      });
      alert("Menu items assigned to role successfully.");
      navigate("/staffs/role-menu-item");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Failed to assign menu items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rmi-scope">
      <div className="form-wrap">
        <div className="form-card">
          <div className="card-header">Add Role Menu Items</div>

          {err && <div className="error">{err}</div>}
          {loading && <div className="status">Loading...</div>}

          <form onSubmit={onSubmit}>
            <div className="card-body">
              <div className="row">
                <label>Role</label>
                <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
                  <option value="">{roles.length ? "-- Select Role --" : "Loading roles…"}</option>
                  {roles?.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>

              <div className="row">
                <label>Menu Items (multi-select)</label>
                <select
                  multiple
                  value={selectedMenuItemIds}
                  onChange={(e) => setSelectedMenuItemIds(Array.from(e.target.selectedOptions).map(o => o.value))}
                >
                  {menuItems?.length
                    ? menuItems.map(mi => <option key={mi.id} value={mi.id}>{mi.title}</option>)
                    : <option disabled>Loading menu items…</option>}
                </select>
                <div className="hint">Hold Ctrl/Cmd to select multiple</div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate("/staffs/role-menu-item")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
