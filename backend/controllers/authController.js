const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Learner = require("../models/learnerModel"); // Adjust the path as needed

// Controller function to handle login and generate JWT token
const generateTokenOnLogin = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find the learner by email
    const learner = await Learner.findOne({ email });

    // Check if the learner exists
    if (!learner) {
      return res.status(404).json({ message: "Learner not found." });
    }

    // Check if the learner is verified (optional, if you have a verification field)
    // if (!learner.isVerified) {
    //   return res.status(403).json({ message: "You are not verified." });
    // }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, learner.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Password is correct, generate JWT token
    const secretKey = process.env.JWT_TOKEN_SECRET_KEY; // Secret key for signing the JWT
    const token = jwt.sign(
      { id: learner._id, fullName: learner.fullName, email: learner.email }, // Payload with learner's details
      secretKey, // Secret key for signing the token
      { expiresIn: "24h" } // Set token expiration time (12 hours)
    );

    // Return the generated token in the response
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed. Please try again." });
  }
};

module.exports = { generateTokenOnLogin };
