import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "../../styles/listPage.css";

const CourseGroupList = () => {
  const [courses, setCourses] = useState([]);
  const [courseGroups, setCourseGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [courseRes, cgRes] = await Promise.all([
          api.get("http://localhost:8080/api/courses"),
          api.get("http://localhost:8080/api/course-groups"),
        ]);
        setCourses(courseRes.data || []);
        setCourseGroups(cgRes.data || []);
      } catch (err) {
        console.error("Error fetching course groups or courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDeleteMappingById = async (mappingId) => {
    if (!window.confirm("Delete this mapping?")) return;
    try {
      await api.delete(`http://localhost:8080/api/course-groups/${mappingId}`);
      alert("Deleted successfully.");
      setCourseGroups((prev) => prev.filter((cg) => cg.id !== mappingId));
    } catch (err) {
      console.error("Error deleting mapping:", err);
      alert("Failed to delete mapping.");
    }
  };

  const handleDeleteAllForCourse = async (courseId) => {
    if (!window.confirm("Remove all groups from this course?")) return;
    try {
      await api.delete(
        `http://localhost:8080/api/course-groups/course/${courseId}/groups`
      );
      alert("All groups removed for course.");
      setCourseGroups((prev) =>
        prev.filter((cg) => cg.courseId !== Number(courseId))
      );
    } catch (err) {
      console.error("Error deleting course groups:", err);
      alert("Failed to remove groups for course.");
    }
  };

  if (loading) return <p>Loading course groups...</p>;

  const grouped = {};
  courseGroups.forEach((cg) => {
    const cid = String(cg.courseId);
    if (!grouped[cid])
      grouped[cid] = { courseName: null, groupNames: [], mappingIds: [] };
    grouped[cid].courseName =
      courses.find((c) => Number(c.id) === Number(cg.courseId))?.name ||
      `Course ${cg.courseId}`;
    const gName = cg.group?.name ?? `Group ${cg.group?.id ?? "?"}`;
    grouped[cid].groupNames.push(gName);
    grouped[cid].mappingIds.push(cg.id);
  });

  const courseRows = courses.map((c) => {
    const entry = grouped[String(c.id)];
    return {
      courseId: c.id,
      courseName: c.name,
      groupNames: entry ? entry.groupNames : [],
      mappingIds: entry ? entry.mappingIds : [],
    };
  });

  return (
    <div className="list-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Course Groups</h2>
        <Button
          variant="primary"
          onClick={() => navigate("/groups/course-group/add")}
        >
          <FaPlus className="me-2" /> Assign Groups
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Course Name</th>
            <th>Groups Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseRows.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No courses found
              </td>
            </tr>
          ) : (
            courseRows.map((row, idx) => (
              <tr key={row.courseId}>
                <td>{idx + 1}</td>
                <td>{row.courseName}</td>
                <td>
                  {row.groupNames.length
                    ? row.groupNames.join(", ")
                    : "No groups assigned"}
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      navigate(`/groups/course-group/edit/${row.courseId}`)
                    }
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteAllForCourse(row.courseId)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseGroupList;
