import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp({ setShowSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        role: ["USER"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsername("");
        setPassword("");
        setEmail("");
        setShowSignup(false);
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-customPink to-customPurple shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center mt-5">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Sign up
                </h1>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSignup}>
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
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-2 block w-full shadow-sm sm:text-sm focus:ring-pink-500 border-[1px] focus:border-pink-500 border-gray-400  rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-400 border-[1px] rounded-md"
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
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-2 block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 border-gray-400 border-[1px] rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-customPink to-customPurple hover:from-customPink hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
