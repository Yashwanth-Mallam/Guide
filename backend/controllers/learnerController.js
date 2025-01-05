import learnerModel from "../models/learnerModel";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
require("dotenv").config();
// const JWT_SECRET = process.env.JWT_SECRET;

// Get all learners
export async function getAllLearners(req, res) {
  try {
    console.log("getAllLearners function is being called"); // Log to verify route is hit

    // Fetch learners from the database
    const learners = await learnerModel.find();

    // Log the learners to the terminal (console)
    console.log("Fetched learners:", learners);

    // Send the learners as a response
    res.json(learners);
  } catch (error) {
    // If there’s an error, log it and send a 500 status with a message
    console.error("Error fetching learners:", error);
    res.status(500).json({ message: "Failed to fetch learners" });
  }
}

// Get a specific learner by ID
export async function getLearnerById(req, res) {
  const learnerId = req.params.id;
  try {
    const learner = await learnerModel.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }
    res.json(learner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Login learner
export async function loginLearner(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the learner exists
    const learner = await learnerModel.findOne({ email });
    if (!learner) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, learner.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, return learner data (without JWT)
    res.status(200).json({
      status: true,
      learnerId: learner._id, // You can return the learner's ID instead
      email: learner.email, // Or any other relevant data you want to return
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Error occurred" });
  }
}

// Create a new learner
export async function createLearners(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // Validate that required fields are present
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Full name, email, and password are required",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newLearner = await learnerModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      success: true,
      message: "Registered successfully",
      data: newLearner,
    });
  } catch (error) {
    console.error("Error creating learner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update an existing learner
export async function updateLearner(req, res) {
  const learnerId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const learner = await learnerModel.findByIdAndUpdate(
      learnerId,
      { name, email, password },
      { new: true }
    );
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }
    res.json(learner);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a learner
export async function deleteLearner(req, res) {
  const learnerId = req.params.id;
  try {
    const learner = await learnerModel.findByIdAndDelete(learnerId);
    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// Follow a tutor
export async function followTutor(req, res) {
  try {
    const learnerId = req.params.id;
    const tutorId = req.body.tutorId;
    const learner = await learnerModel.findByIdAndUpdate(
      learnerId,
      { $push: { followedTutors: tutorId } },
      { new: true }
    );
    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: "Failed to follow tutor" });
  }
}

// Unfollow a tutor
export async function unfollowTutor(req, res) {
  try {
    const learnerId = req.params.id;
    const tutorId = req.body.tutorId;
    const learner = await learnerModel.findByIdAndUpdate(
      learnerId,
      { $pull: { followedTutors: tutorId } },
      { new: true }
    );
    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: "Failed to unfollow tutor" });
  }
}

module.exports = {
  getAllLearners,
  getLearnerById,
  loginLearner,
  createLearners,
  updateLearner,
  deleteLearner,
  followTutor,
  unfollowTutor,
};
