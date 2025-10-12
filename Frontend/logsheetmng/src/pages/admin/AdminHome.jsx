import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/adminHome.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function AdminHome() {
  const navigate = useNavigate();

  // dummy counts
  const activeCourses = 12;
  const pastCourses = 8;
  const totalStaff = 25;
  const totalUsers = 40;
  const totalReports = 15;

  // KPI tiles (with icons)
  const metrics = useMemo(
    () => [
      {
        k: "courses",
        title: "Total Courses",
        v: activeCourses + pastCourses,
        sub: `${activeCourses} Active · ${pastCourses} Past`,
        goto: "courses",
        icon: "bi bi-journal-bookmark", // 📘
        accent: "kpi-blue",
      },
      {
        k: "staff",
        title: "Total Staff",
        v: totalStaff,
        sub: "Instructors & Admin",
        goto: "staff",
        icon: "bi bi-person-gear", // 🧑‍🏫
        accent: "kpi-purple",
      },
      {
        k: "users",
        title: "Total Users",
        v: totalUsers,
        sub: "Learners & Guests",
        goto: "users",
        icon: "bi bi-people", // 👥
        accent: "kpi-teal",
      },
      {
        k: "reports",
        title: "Total Reports",
        v: totalReports,
        sub: "Generated this month",
        goto: "reports",
        icon: "bi bi-clipboard-data", // 📊
        accent: "kpi-amber",
      },
    ],
    []
  );

  // charts
  const pieData = {
    labels: ["Active Courses", "Past Courses"],
    datasets: [
      {
        data: [activeCourses, pastCourses],
        backgroundColor: ["#4e73df", "#1cc88a"],
        borderWidth: 0,
      },
    ],
  };
  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 12 } },
      title: { display: true, text: "Courses Overview" },
    },
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Logs Entered",
        data: [12, 19, 8, 15, 22, 30],
        backgroundColor: "#36b9cc",
        borderRadius: 6,
        barThickness: 26,
      },
    ],
  };
  const barOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom" },
      title: { display: true, text: "Logs Activity" },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.06)" },
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <>
      <div className="content-header">
        <div>
          <h3 className="mb-1">Welcome back 👋</h3>
          <div className="text-muted small">
            Here’s what’s happening across your courses today.
          </div>
        </div>
      </div>

      {/* KPI tiles with icons */}
      <Row className="g-3 mb-2 kpi-row">
        {metrics.map((m) => (
          <Col key={m.k} xs={12} sm={6} lg={3}>
            <Card
              className={`kpi-card shadow-sm ${m.accent}`}
              role="button"
              onClick={() => handleSelect(m.goto)}
            >
              <Card.Body className="py-3">
                <div className="kpi-top">
                  <div className="kpi-icon">
                    <i className={m.icon} />
                  </div>
                  <div className="kpi-value">{m.v}</div>
                </div>
                <div className="kpi-title">{m.title}</div>
                <div className="kpi-sub">{m.sub}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="g-3 charts-row">
        <Col xs={12} lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="chart-wrap">
              <Pie data={pieData} options={pieOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="chart-wrap">
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
