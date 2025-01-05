import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate("/SignUp"); // Navigate to the login page when clicked
  };
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to Login page
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 text-center">
      {/* Header Section */}
      <header className="bg-green-500 text-white py-24">
        <h1 className="text-5xl font-bold mb-4">Guide</h1>
        <p className="text-xl mb-8">Learn and practice code with friends</p>
        <div className="flex justify-center gap-2">
          <button
            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300"
            onClick={handleJoinNowClick}
          >
            sign up
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-20">
        <h2 className="text-3xl font-semibold mb-12">Why Choose CodeMate?</h2>
        <div className="flex justify-center gap-12">
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-64">
            <h3 className="text-xl font-semibold mb-4">Learn Together</h3>
            <p>
              Collaborate with friends and learn programming in a fun and
              engaging way.
            </p>
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-64">
            <h3 className="text-xl font-semibold mb-4">Practice Challenges</h3>
            <p>
              Test your coding skills with a wide variety of challenges and
              problems.
            </p>
          </div>
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-64">
            <h3 className="text-xl font-semibold mb-4">Live Coding Sessions</h3>
            <p>
              Join live coding sessions and solve problems together in real
              time.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <h2 className="text-3xl font-semibold mb-8">About CodeMate</h2>
        <p className="text-lg max-w-4xl mx-auto">
          CodeMate is a platform designed for learners who want to improve their
          coding skills by working with friends. Whether you're just starting or
          looking to enhance your skills, CodeMate offers a collaborative
          environment to help you learn and practice coding effectively.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <p>© 2024 CodeMate. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
