const express = require("express");
const {
  createLearnerProfile,
  getAllLearnerProfiles,
  getLearnerProfileById,
  updateLearnerProfile,
  deleteLearnerProfile,
} = require("../controllers/learnerProfileController"); // Adjust the path to the controller file if needed

const router = express.Router();

// Route to create a new learner profile
router.post("/api/learnerprofiles", createLearnerProfile);

// Route to get all learner profiles
router.get("/api/learnerprofiles", getAllLearnerProfiles);

// Route to get a single learner profile by ID
router.get("/api/learnerprofiles/:learnerId", getLearnerProfileById);

// Route to update a learner profile by ID
router.put("/api/learnerprofiles/:id", updateLearnerProfile);

// Route to delete a learner profile by ID
router.delete("/api/learnerprofiles/:id", deleteLearnerProfile);

module.exports = router;
