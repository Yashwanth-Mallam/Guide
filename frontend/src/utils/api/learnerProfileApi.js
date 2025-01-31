import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "http://localhost:4000"; // Update with your backend base URL

// Create a new learner profile
export const createLearnerProfileAPI = async (profileData) => {
  try {
    await axios.post(`${API_URL}/api/learnerprofiles`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error creating learner profile:", error.message);
    throw error;
  }
};

// Get all learner profiles
export const getAllLearnerProfilesAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/learnerprofiles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all learner profiles:", error.message);
    throw error;
  }
};

// Get a specific learner profile by ID
// Get a specific learner profile by ID
export const getLearnerProfileByIdAPI = async () => {
  try {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Token not found in local storage");
    }

    // Decode the token to extract the ID
    const decodedToken = jwtDecode(token);

    const learnerId = decodedToken.id;

    // Set the Authorization header with the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch the learner profile
    const response = await axios.get(
      `${API_URL}/api/learnerprofiles/${learnerId}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    // Handle the error
    console.error("Error fetching learner profile:", error.message);
    throw error;
  }
};
/* global response */ // Add this comment

// Update a learner profile by ID
export const updateLearnerProfileAPI = async (learnerId, profile) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/learnerprofiles/${learnerId}`,
      profile
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating learner profile with ID ${learnerId}:`,
      error.message
    );
    throw error;
  }
};

// Delete a learner profile by ID
export const deleteLearnerProfileAPI = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/learnerprofiles/${id}`);
  } catch (error) {
    console.error(
      `Error deleting learner profile with ID ${id}:`,
      error.message
    );
    throw error;
  }
};
