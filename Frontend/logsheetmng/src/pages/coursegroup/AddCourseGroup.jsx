import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseGroupForm from "../../components/CourseGroupForm";

const AddCourseGroup = () => {
  const navigate = useNavigate();
  const [courseGroup, setCourseGroup] = useState({
    courseId: "",
    groupIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseGroup.courseId || !courseGroup.groupIds || courseGroup.groupIds.length === 0) {
      alert("Please select a course and at least one group.");
      return;
    }

    const payload = {
      courseId: Number(courseGroup.courseId),
      groupIds: courseGroup.groupIds.map(Number),
    };

    try {
      await axios.post("http://localhost:8080/api/course-groups", payload);
      alert("Groups assigned successfully!");
      navigate("/groups/course-group");
    } catch (err) {
      console.error("Error assigning groups:", err);
      alert(err.response?.data?.message || "Failed to assign groups. Check backend logs.");
    }
  };

  return (
    <CourseGroupForm
      courseGroup={courseGroup}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Assign Groups to Course"
      buttonLabel="Assign"
    />
  );
};

export default AddCourseGroup;
