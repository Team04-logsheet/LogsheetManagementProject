const menuData = [
  {
    key: "courses",
    label: "📘 Course Management",
    children: [
      { key: "batch-cycle", label: "Batch Cycle" },
      { key: "premises", label: "Premises" },
      { key: "course-type", label: "Course Type" },
      { key: "", label: "Courses" },
    ],
  },
  {
    key: "modules",
    label: "📂 Course Module Management",
    children: [
      { key: "subject", label: "Subject" },
      { key: "section", label: "Section" },
      { key: "Topic", label: "Topic" },
    ],
  },
  {
    key: "groups",
    label: "👥 Course Group Management",
    children: [
      { key: "groups", label: "Group" },
      { key: "course-group", label: "Course Group" },
    ],
  },
  {
    key: "reports",
    label: "📊 Report Management",
    children: [
      { key: "module-progress-report", label: "Module Progress Report" },
      { key: "course-progress-report", label: "Course Progress Report" },
    ],
  },
  {
    key: "staffs",
    label: "👤 User Management",
    children: [
      { key: "menu-item", label: "Menu Item" },
      { key: "role", label: "Role" },
      { key: "", label: "Staff" },
      { key: "course-coordinator", label: "Course Coordinator" },
    ],
  },
  {
    key: "logsheet",
    label: "🗒️ Logsheet Management",
    children: [
      { key: "logsheet-type", label: "Logsheet Type" },
      { key: "logs", label: "Logs" },
    ],
  },
  {
    key: "administration",
    label: "⚙️ Course Administration",
    children: [
      { key: "settings", label: "Settings" },
      { key: "policies", label: "Policies" },
    ],
  },
];

export default menuData;
