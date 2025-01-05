import axios from "axios";

//Fetch all courses
const API_URL = "http://localhost:4000";
export const getAllCourses = () => {
  // Make sure the URL matches the backend route
  return axios.get(`${API_URL}/`);
};

//Fetch a specific course by ID

export const getCourseById = (courseId) => {
  return axios.get(`${API_URL}/${courseId}`);
};

// //Create a new course

// export const createCourse = (courseData) => {
//   return axios.post({ API_URL }`api/courses`, courseData);
// };

// //update an existing course

// export const updateCourse = (courseId, courseData) => {
//   return axios.put({ API_URL }`/api/courses/${courseId}`, courseData);
// };

// //Delete a course

// export const deleteCourse = (courseId) => {
//   return axios.delete({ API_URL }`/api/courses/${courseId}`);
// };
