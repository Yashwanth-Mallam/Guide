const LearnerProfile = require("../models/learnerProfileModel"); // Adjust the path as necessary

// Create a new learner profile
const createLearnerProfile = async (req, res) => {
  try {
    const {
      learner,
      fullName,
      dateOfBirth,
      contactNumber,
      skills,
      education,
      profilePicture,
      interests,
      linkedinLink,
      githubLink,
      codingLevel,
    } = req.body;

    // Create the learner profile
    const newProfile = new LearnerProfile({
      learner,
      fullName,
      dateOfBirth,
      contactNumber,
      skills,
      education,
      profilePicture,
      interests,
      linkedinLink,
      githubLink,
      codingLevel,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "Learner profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating learner profile",
      error: error.message,
    });
  }
};

// Get all learner profiles
const getAllLearnerProfiles = async (req, res) => {
  try {
    const profiles = await LearnerProfile.find().populate(
      "learner",
      "email fullName"
    );
    res.status(200).json({
      message: "Learner profiles fetched successfully",
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching learner profiles",
      error: error.message,
    });
  }
};

const getLearnerProfileById = async (req, res) => {
  try {
    const { learnerId } = req.params; // Retrieve learnerId from query parameters

    if (!learnerId) {
      return res.status(400).json({ message: "learnerId is required" }); // Return an error if learnerId is missing
    }
    // Find the profile by learnerId and populate the learner field with email and fullName
    const profile = await LearnerProfile.findOne({ learner: learnerId }) // Correct query format
      .populate(
        "learner", // Reference to Learner model
        "email fullName" // Only populate these fields from the Learner model
      );
      if (!profile) {
        return res.status(404).json({ message: "Learner profile not found" });
      }

    res.status(200).json({
      message: "Learner profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching learner profile:", error);
    res.status(500).json({
      message: "Error fetching learner profile",
      error: error.message,
    });
  }
};


// Update a learner profile
const updateLearnerProfile = async (req, res) => {
  try {
    const { learnerId } = req.params;
    const profile = await LearnerProfile.findOneAndUpdate(
      { learner: learnerId }, // Correct query format
      req.body,
      { new: true } // Return the updated document
    );
    if (!profile) {
      return res.status(404).json({ message: "Learner profile not found" });
    }
    res.status(200).json({
      message: "Learner profile updated successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating learner profile",
      error: error.message,
    });
  }
};


// Delete a learner profile
const deleteLearnerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await LearnerProfile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Learner profile not found" });
    }
    res.status(200).json({
      message: "Learner profile deleted successfully",
      data: deletedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting learner profile",
      error: error.message,
    });
  }
};

module.exports = {
  createLearnerProfile,
  getAllLearnerProfiles,
  getLearnerProfileById,
  updateLearnerProfile,
  deleteLearnerProfile,
};
