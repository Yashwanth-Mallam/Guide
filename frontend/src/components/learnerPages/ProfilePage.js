import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLearnerProfileByIdAPI,
  updateLearnerProfileAPI,
  createLearnerProfileAPI,
} from "../../utils/api/learnerProfileApi";
import { format } from "date-fns";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(false);

  // Fetch learner profile from the backend
  const fetchUserProfile = async () => {
    try {
      const response = await getLearnerProfileByIdAPI();
      setProfile(response.data);
      //log the data here
      console.log("profile data:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle form submission for creating or updating the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const learnerId = localStorage.getItem("learnerId");
      if (isNewProfile) {
        // Call API to create new profile
        console.log("Creating new profile:", profile);
        await createLearnerProfileAPI(profile);
        // await createLearnerProfileAPI(learnerId, profile);
      } else {
        // Call API to update existing profile
        console.log("Updating existing profile:", profile);
        await updateLearnerProfileAPI(learnerId, profile);
      }
      // Log success and toggle editing state
      console.log(
        isNewProfile
          ? "Profile created successfully"
          : "Profile updated successfully"
      );
    } catch (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {isNewProfile ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Create Profile
            </h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile?.fullName || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile?.dateOfBirth || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={profile?.contactNumber || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={profile?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Coding Level */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Coding Level
              </label>
              <select
                name="codingLevel"
                value={profile?.codingLevel || "beginner"}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Interests (comma-separated)
              </label>
              <input
                type="text"
                name="interests"
                value={profile?.interests?.join(", ") || ""}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    interests: e.target.value
                      .split(",")
                      .map((interest) => interest.trim()),
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Education */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Education
              </label>
              <textarea
                name="education"
                value={profile?.education || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            >
              {isNewProfile ? "Create Profile" : "Save Changes"}
            </button>
          </form>
        ) : !editing ? (
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Profile
            </h2>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Full Name:</strong> {profile?.fullName || "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Date of Birth:</strong>{" "}
              {profile?.dateOfBirth
                ? format(new Date(profile.dateOfBirth), "dd/MM/yyyy")
                : "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Contact Number:</strong> {profile?.contactNumber || "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Skills:</strong> {profile?.skills?.join(", ") || "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Coding Level:</strong> {profile?.codingLevel || "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Education:</strong>{" "}
              {profile?.education?.length > 0
                ? profile.education.map((edu, index) => (
                    <div className="flex flex-col" key={index}>
                      <p>
                        <strong>Degree:</strong> {edu.degree}
                      </p>
                      <p>
                        <strong>Institution:</strong> {edu.institution}
                      </p>
                      <p>
                        <strong>Start Date:</strong>{" "}
                        {format(new Date(edu.startDate), "dd/MM/yyyy")}
                      </p>
                      <p>
                        <strong>End Date:</strong>{" "}
                        {format(new Date(edu.endDate), "dd/MM/yyyy")}
                      </p>
                    </div>
                  ))
                : "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Interests:</strong>{" "}
              {profile?.interests?.length > 0
                ? profile.interests.join(", ")
                : "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>UserName:</strong> {profile?.learner?.fullName || "N/A"}
            </p>
            <p className="text-lg text-gray-800 mb-4">
              <strong>Email:</strong> {profile?.learner?.email || "N/A"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="bg-orange-500 text-white py-2 px-4 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Edit Profile
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profile?.fullName || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={
                  profile?.dateOfBirth
                    ? format(new Date(profile.dateOfBirth), "yyyy-MM-dd")
                    : ""
                }
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={profile?.contactNumber || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={profile?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Coding Level
              </label>
              <select
                name="codingLevel"
                value={profile?.codingLevel || "beginner"}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Interests (comma-separated)
              </label>
              <input
                type="text"
                name="interests"
                value={profile?.interests?.join(", ") || ""}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    interests: e.target.value
                      .split(",")
                      .map((interest) => interest.trim()),
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full text-lg hover:bg-gray-400 transition duration-300 ml-4"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
