import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import CourseForm from "../../components/CourseForm";

const EditCourse = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/api/courses/${id}`
        );
        const { batchCycleId, premiseId, courseTypeId, ...rest } =
          response.data;
        setCourse({
          ...rest,
          batchCycleId: batchCycleId.toString(),
          premiseId: premiseId.toString(),
          courseTypeId: courseTypeId.toString(),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        alert("Failed to load course data.");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:8080/api/courses/${id}`, course)
      .then(() => {
        alert("Course updated successfully!");
        navigate("/courses");
      })
      .catch((err) => {
        console.error("Error updating course:", err);
        alert("Failed to update course.");
      });
  };

  if (loading) {
    return <p>Loading course...</p>;
  }

  return (
    <CourseForm
      course={course}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formTitle="Edit Course"
      buttonLabel="Save"
    />
  );
};

export default EditCourse;
