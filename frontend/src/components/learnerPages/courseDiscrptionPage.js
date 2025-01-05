import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../utils/api/courseApi"; // Ensure this function is correctly imported

const CourseDescriptionPage = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(courseId); // Fetch course by ID
        setCourse(response.data);
        //log the data here
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]); // Fetch course when courseId changes

  if (!course) return <div>Loading...</div>; // Display loading message until course data is fetched

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {course.courseTitle}
        </h2>
        <div className="mb-6">
          <img
            src={course.coverImage}
            alt={course.courseTitle}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Description</h3>
          <p className="text-gray-600 text-sm">{course.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Category</h3>
          <p className="text-gray-600 text-sm">{course.category}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Tutor</h3>
          <div className="flex items-center">
            <img
              src={course.tutor.avatar}
              alt={course.tutor.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <span className="text-gray-800 font-semibold">
              {course.tutor.name}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Uploaded By</h3>
          <p className="text-gray-600 text-sm">{course.uploadedBy}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Uploaded At</h3>
          <p className="text-gray-600 text-sm">
            {new Date(course.uploadedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDescriptionPage;
