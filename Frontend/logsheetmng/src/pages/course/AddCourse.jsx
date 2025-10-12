import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import CourseForm from "../../components/CourseForm";

const AddCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    batchCycleId: "",
    premiseId: "",
    courseTypeId: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:8080/api/courses", course);
      alert("Course created successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course.");
    }
  };

  return (
    <CourseForm
      course={course}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Course"
      buttonLabel="Create"
    />
  );
};

export default AddCourse;
