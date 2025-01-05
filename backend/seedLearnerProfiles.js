// const mongoose = require("mongoose");
// const { faker } = require("@faker-js/faker"); // Keep this line
// const Learner = require("./models/learnerModel");
// const LearnerProfile = require("./models/learnerProfileModel");

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/codei", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const seedLearnerProfiles = async () => {
//   try {
//     const learners = await Learner.find(); // Ensure you have learner data in the DB
//     for (const learner of learners) {
//       const profile = new LearnerProfile({
//         learner: learner._id,
//         fullName: faker.person.fullName(), // Update method for full name
//         dateOfBirth: faker.date.past(20, new Date(2000, 0, 1)), // Example: Generate a past date
//         contactNumber: faker.phone.number(), // Update method for phone number
//         skills: [faker.word.adjective(), faker.word.noun()], // Update for random words
//         education: [
//           {
//             degree: "Bachelor of Science",
//             institution: "University of XYZ",
//             startDate: faker.date.past(4, new Date()),
//             endDate: faker.date.past(2, new Date()),
//           },
//         ],
//         codingLevel: "beginner",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//       await profile.save();
//     }
//     console.log("Seeding completed successfully!");
//   } catch (err) {
//     console.error("Error seeding learner profiles:", err);
//   }
// };

// seedLearnerProfiles();
