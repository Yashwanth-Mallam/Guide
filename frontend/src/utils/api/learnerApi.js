import axios from "axios";

const API_URL = "http://localhost:4000"; // Replace with the actual API URL

// Register a new learner
export const createLearnersAPI = async (learnerData) => {
  try {
    await axios.post(`${API_URL}/api/learner/register`, learnerData);
  } catch (error) {
    console.error("Error registering learner:", error);
    throw error;
  }
};

// API call to login learner
export async function loginLearnerAPI(email, password) {
  try {
    const response = await axios.post(`${API_URL}/api/learner/login`, {
      email,
      password,
    });
    return response.data; // This should return the data (token, etc.)
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// // Fetch all learners
// export const getAllLearnersAPI = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/`);
//     return response.data; // Return the list of learners
//   } catch (error) {
//     console.error("Error fetching learners:", error);
//     throw error;
//   }
// };

// // Fetch a specific learner by ID
// export const getLearnerByIdAPI = async (learnerId) => {
//   try {
//     const response = await axios.get(`${API_URL}/${learnerId}`);
//     return response.data; // Return the learner data
//   } catch (error) {
//     console.error("Error fetching learner:", error);
//     throw error;
//   }
// };

// // Update learner details
// export const updateLearnerAPI = async (authToken, learnerId, updatedData) => {
//   try {
//     await axios.put(`${API_URL}/${learnerId}/update`, updatedData, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating learner:", error);
//     throw error;
//   }
// };

// // Delete a learner
// export const deleteLearnerAPI = async (authToken, learnerId) => {
//   try {
//     await axios.delete(`${API_URL}/${learnerId}/delete`, {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting learner:", error);
//     throw error;
//   }
// };
