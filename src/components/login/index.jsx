import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../signup";
import { apiUrl } from "../../data";

/**
 * Represents the Login component.
 * - Provides a form for users to input their username and password for authentication.
 * - Handles login functionality, including sending a POST request to the authentication endpoint.
 * - Stores authentication token, username, and ID in local storage upon successful login.
 * - Redirects to the home page upon successful login.
 * - Provides a button to switch to the sign-up form.
 * @param onLoginSuccess Function to call upon successful login.
 * @returns The Login component containing a form for user authentication and an option to switch to the sign-up form.
 */

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, {
        username,
        password,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("id", response.data.id);
      onLoginSuccess(response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {showSignup ? (
        <SignUp setShowSignup={setShowSignup} />
      ) : (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-customPink to-customPurple shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="text-center mt-5">
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Login
                  </h1>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-[1px] border-gray-400 rounded-md p-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-[1px] border-gray-400 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-customPink to-customPurple hover:from-customPink hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg">
                      Login
                    </button>
                    <div>
                      <button
                        onClick={() => setShowSignup(true)}
                        className="bg-gradient-to-r from-customPink to-customPurple hover:from-customPink hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg mt-5">
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
