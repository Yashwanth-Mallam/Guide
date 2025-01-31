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
export const loginLearnerAPI = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/learner/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    // Parse the response JSON
    const data = await response.json();

    // Extract the relevant fields from the backend response
    const { token, learnerId, email: learnerEmail, fullName } = data;

    // Return the parsed data
    return {
      token,
      learnerId,
      learnerEmail,
      fullName,
    };
  } catch (error) {
    console.error("Login API Error:", error.message || error);
    throw error;
  }
};

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

// Fetch a specific learner by ID
export const getLearnerByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/learner/${id}`);
    return response.data; // Return the learner data
  } catch (error) {
    console.error("Error fetching learner:", error);
    throw error;
  }
};

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
