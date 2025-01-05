import Course from '../models/courseModel';

// Get all courses
export async function getAllCourses(req, res) {
  try {
    console.log('getAllCourses function is being called'); // Log to verify route is hit

    // Fetch courses from the database
    const courses = await Course.find();

    // Log the courses to the terminal (console)
    console.log('Fetched courses:', courses);

    // Send the courses as a response
    res.json(courses);
  } catch (error) {
    // If there’s an error, log it and send a 500 status with a message
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
}


// Get a course by ID
export async function getCourseById(req, res) {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course' });
  }
}

// Create a new course
export async function createCourse(req, res) {
  try {
    const { category, courseTitle, description, uploadedBy, uploadedAt } = req.body;
    const course = await Course.create({ category, courseTitle, description, uploadedBy, uploadedAt });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course' });
  }
}

// Update a course
export async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const { category, courseTitle, description, uploadedBy, uploadedAt } = req.body;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { category, courseTitle, description, uploadedBy, uploadedAt },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course' });
  }
}

// Delete a course
export async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
}

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
