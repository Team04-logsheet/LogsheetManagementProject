import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseTypeForm from "../../components/CourseTypeForm";

const AddCourseType = () => {
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseType({ ...courseType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/course-types", courseType);
      alert("Course type created successfully!");
      navigate("/courses/course-type");
    } catch (error) {
      console.error("Error creating course type:", error);
      alert("Failed to create course type.");
    }
  };

  return (
    <CourseTypeForm
      courseType={courseType}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Add New Course Type"
      buttonLabel="Create"
    />
  );
};

export default AddCourseType;
