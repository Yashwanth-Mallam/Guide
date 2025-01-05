import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllCourses } from "../../utils/api/courseApi";
const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);
  //featch the courses here.
  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      console.log("Fetched courses from API:", response.data); // Log the data after fetching
      setCourses(response.data); // Set courses state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Run the fetchCourses function on component mount
  useEffect(() => {
    fetchCourses();
  }, []);
  // write the handleCourseClick
  const handleCourseClick = (course) => {
    console.log(course._id); // Logs the course ID
    navigate(`/courses/${course._id}`); // Navigate using course._id in the URL
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Our Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => handleCourseClick(course)} // Pass the entire course object
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
