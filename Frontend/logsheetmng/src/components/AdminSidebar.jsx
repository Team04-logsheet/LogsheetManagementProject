import React, { useMemo } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import menuData from "../data/menuData";
import "../styles/adminSidebar.css";

export default function AdminSidebar({ openKey = "courses" }) {
  const navigate = useNavigate();

  const go = (parent, child) => {
    navigate(child ? `/${parent}/${child}` : `/${parent}`);
  };

  return (
    <div className="admin-sidebar">
      <h4 className="sidebar-title">Admin Panel</h4>
      <br />

      <Accordion
        defaultActiveKey={openKey}
        alwaysOpen={false}
        className="sidebar-accordion"
      >
        {menuData.map((sec) =>
          sec.children ? (
            <Accordion.Item
              key={sec.key}
              eventKey={sec.key}
              className="sidebar-item"
            >
              <Accordion.Header className="sidebar-accordion-header">
                <span className="label">{sec.label}</span>
              </Accordion.Header>
              <Accordion.Body className="p-0">
                <Nav className="flex-column submenu">
                  {sec.children.map((child) => (
                    <Nav.Link
                      key={child.key}
                      className="nav-leaf"
                      onClick={() => go(sec.key, child.key)}
                    >
                      {child.label}
                    </Nav.Link>
                  ))}
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            <Nav.Link key={sec.key} onClick={() => go(sec.key)}>
              {sec.label}
            </Nav.Link>
          )
        )}
      </Accordion>
    </div>
  );
}
