import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import CourseGroupForm from "../../components/CourseGroupForm";

const EditCourseGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseGroup, setCourseGroup] = useState({
    courseId: id,
    groupIds: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const res = await api.get(
          `http://localhost:8080/api/course-groups/course/${id}`
        );
        const data = res.data || [];
        const groupIds = data.map((cg) => Number(cg.group?.id)).filter(Boolean);
        setCourseGroup({ courseId: id, groupIds });
      } catch (err) {
        console.error("Error fetching assigned groups:", err);
        alert(err.response?.data?.message || "Failed to load assigned groups.");
        navigate("/groups/course-group");
      } finally {
        setLoading(false);
      }
    };
    fetchAssigned();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !courseGroup.courseId ||
      !courseGroup.groupIds ||
      courseGroup.groupIds.length === 0
    ) {
      alert("Please select at least one group.");
      return;
    }

    try {
      await api.delete(
        `http://localhost:8080/api/course-groups/course/${id}/groups`
      );

      const payload = {
        courseId: Number(courseGroup.courseId),
        groupIds: courseGroup.groupIds.map(Number),
      };
      await api.post("http://localhost:8080/api/course-groups", payload);

      alert("Course groups updated successfully!");
      navigate("/groups/course-group");
    } catch (err) {
      console.error("Error updating course groups:", err);
      alert(err.response?.data?.message || "Failed to update course groups.");
    }
  };

  if (loading) return <p>Loading assigned groups...</p>;

  return (
    <CourseGroupForm
      courseGroup={courseGroup}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Course Groups"
      buttonLabel="Update"
    />
  );
};

export default EditCourseGroup;
