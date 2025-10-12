import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import CourseTypeForm from "../../components/CourseTypeForm";

const EditCourseType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`http://localhost:8080/api/course-types/${id}`)
      .then((res) => {
        setCourseType(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course type:", err);
        alert("Failed to load course type data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseType({ ...courseType, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/course-types/${id}`, courseType)
      .then(() => {
        alert("Course type updated successfully!");
        navigate("/courses/course-type");
      })
      .catch((err) => {
        console.error("Error updating course type:", err);
        alert("Failed to update course type.");
      });
  };

  if (loading) {
    return <p>Loading course type...</p>;
  }

  return (
    <CourseTypeForm
      courseType={courseType}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Course Type"
      buttonLabel="Save"
    />
  );
};

export default EditCourseType;
