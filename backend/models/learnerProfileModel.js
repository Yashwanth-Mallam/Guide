const mongoose = require("mongoose");

// Reference the Learner model
const Learner = require("./learnerModel"); // Assuming Learner.js is in the same directory

const learnerProfileSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learner", // References the Learner model
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  skills: {
    type: [String], //array
    required: true,
  },
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
    },
  ],
  profilePicture: {
    type: String, // URL or file path for the profile picture
    required: false,
  },
  interests: {
    type: [String], // Array of learner's interests
    required: false,
  },
  linkedinLink: {
    type: String, // URL to LinkedIn profile
    required: false,
  },
  githubLink: {
    type: String, // URL to GitHub profile
    required: false,
  },
  codingLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"], // Coding level options
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const LearnerProfile = mongoose.model("LearnerProfile", learnerProfileSchema);

module.exports = LearnerProfile;
