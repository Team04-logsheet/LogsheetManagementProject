import React, { useMemo } from "react";
import { Accordion, Nav } from "react-bootstrap";
import "../styles/adminSidebar.css";

export default function AdminSidebar({ onSelect, openKey = "courses" }) {
  const menu = useMemo(
    () => [
      {
        key: "courses",
        label: "📘 Course Management",
        children: [
          { key: "batch-cycle", label: "Batch Cycle" },
          { key: "premises", label: "Premises" },
          { key: "course-type", label: "Course Type" },
          { key: "courses", label: "Courses" },
        ],
      },
      { key: "modules", label: "📂 Course Module Management" },
      { key: "groups", label: "👥 Course Group Management" },
      { key: "reports", label: "📊 Report Management" },
      { key: "users", label: "👤 User Management" },
      { key: "administration", label: "⚙️ Course Administration" },
    ],
    []
  );

  const go = (parent, child) =>
    onSelect?.(child ? `${parent}/${child}` : parent);

  const courseSection = menu.find(m => m.key === "courses");
  const otherSections = menu.filter(m => m.key !== "courses");

  return (
    <div className="admin-sidebar">
      <h4 className="sidebar-title">Admin Panel</h4><br></br>

      <Nav className="flex-column">
        {/* Only Course Management has a dropdown */}
        <Accordion defaultActiveKey={openKey} alwaysOpen={false} className="sidebar-accordion">
          <Accordion.Item eventKey={courseSection.key} className="sidebar-item">
            <Accordion.Header className="sidebar-accordion-header">
              <span className="label">{courseSection.label}</span>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <Nav className="flex-column submenu">
                {courseSection.children.map((child) => (
                  <Nav.Link
                    key={child.key}
                    className="nav-leaf"
                    onClick={() => go(courseSection.key, child.key)}
                  >
                    {child.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* All other sections are single clickable links */}
        {otherSections.map((sec) => (
          <Nav.Link key={sec.key} onClick={() => go(sec.key)}>
            {sec.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
