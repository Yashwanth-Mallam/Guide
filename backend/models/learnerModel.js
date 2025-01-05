const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Learner schema
const learnerModel = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true, // Ensures no extra spaces are included
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two learners have the same email
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the Learner model based on the schema
const Learner = mongoose.model("Learner", learnerModel);

module.exports = Learner;
