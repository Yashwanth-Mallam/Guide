import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createLearnerProfileAPI } from "../../utils/api/learnerProfileApi";
const CreateProfilePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [profilePicture, setProfilePicture] = useState("");
  const [interests, setInterests] = useState([]);
  const [linkedinLink, setLinkedinLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [codingLevel, setCodingLevel] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
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
      };

      await createLearnerProfileAPI(profileData);
      navigate("/ProfilePage");
    } catch (error) {
      console.error("Error creating profile:", error);
      setError("Failed to create profile");
    }
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", startDate: "", endDate: "" },
    ]);
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name:
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contact Number:
          </label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Skills:
          </label>
          <input
            type="text"
            value={skills.join(",")}
            onChange={(e) => setSkills(e.target.value.split(","))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Education:
          </label>
          {education.map((edu, index) => (
            <div key={index} className="flex flex-col mb-2">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index ? { ...item, degree: e.target.value } : item
                    )
                  )
                }
                placeholder="Degree"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index
                        ? { ...item, institution: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="Institution"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index
                        ? { ...item, startDate: e.target.value }
                        : item
                    )
                  )
                }
                placeholder="Start Date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) =>
                  setEducation(
                    education.map((item, i) =>
                      i === index ? { ...item, endDate: e.target.value } : item
                    )
                  )
                }
                placeholder="End Date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => handleRemoveEducation(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Education
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profilePicture"
          >
            Profile Picture:
            <input
              type="text"
              id="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="interests"
          >
            Interests:
            <input
              type="text"
              id="interests"
              value={interests.join(",")}
              onChange={(e) => setInterests(e.target.value.split(","))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="linkedinLink"
          >
            LinkedIn Link:
            <input
              type="text"
              id="linkedinLink"
              value={linkedinLink}
              onChange={(e) => setLinkedinLink(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="githubLink"
          >
            GitHub Link:
            <input
              type="text"
              id="githubLink"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="codingLevel"
          >
            Coding Level:
            <select
              id="codingLevel"
              value={codingLevel}
              onChange={(e) => setCodingLevel(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={navigate("/LearnerDashBoard")}
        >
          Create Profile
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProfilePage;
