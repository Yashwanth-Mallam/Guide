import React, { useState } from "react";
import { loginLearnerAPI } from "../../utils/api/learnerApi"; // Import the API function
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react"; // Optional, but if you want to use a loading spinner

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when login starts

    try {
      // Call the loginLearnerAPI function to perform the login
      const data = await loginLearnerAPI(email, password);

      // Check if the response contains the learner ID
      if (data && data.learnerId) {
        // Store the learner ID in localStorage
        localStorage.setItem("learnerId", data.learnerId);

        // Log successful login
        console.log("Login Successful");
        // Redirect to the learner dashboard
        navigate("/LearnerDashBoard");
      } else {
        // If no learner ID in the response, set an error
        setError("Invalid email or password");
      }
    } catch (error) {
      // Handle the error if the login fails
      setError("Invalid email or password");
    } finally {
      setIsLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus // Focus on email input when the page loads
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <Spinner size="sm" color="white" /> // Display loading spinner while waiting
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
