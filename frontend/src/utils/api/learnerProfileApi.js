import axios from "axios";

const API_URL = "http://localhost:4000"; // Update with your backend base URL

// Create a new learner profile
export const createLearnerProfileAPI = async (profileData) => {
  try {
    await axios.post(`${API_URL}/api/learnerprofiles`, profileData);
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
export const getLearnerProfileByIdAPI = async (learnerId) => {
  try {
    // Ensure the learnerId is passed correctly in the URL
    const response = await axios.get(
      `${API_URL}/api/learnerprofiles/${learnerId}`
    );
    
    // Check if response is successful and return the profile data
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch profile, status code: ${response.status}`);
    }
  } catch (error) {
    // Improved error handling with more details and fallback error message
    console.error(
      `Error fetching learner profile with ID ${learnerId}:`,
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};


// Update a learner profile by ID
export const updateLearnerProfileAPI = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/learnerprofiles/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating learner profile with ID ${id}:`,
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
