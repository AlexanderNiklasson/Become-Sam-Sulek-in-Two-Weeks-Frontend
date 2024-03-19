import { useNavigate } from "react-router-dom";

export function Header({ showModal }) {
  const navigate = useNavigate();

  return (
    <header
      className={`bg-white p-5 border-b border-gray-500 ${
        showModal ? "z-[-1]" : "z-[1]"
      }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="../src/assets/header-weight.png"
            alt="logo"
            className="h-12 w-12 text-customPurple mr-5 ml-5 animate-bounce"
          />

          <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-customPurple to-purple-600 bg-clip-text animate-pulse">
            Become Sam Sulek In Two Weeks!
          </h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/generate")}
            className="bg-customPurple text-white p-4 text-xl rounded hover:bg-purple-800">
            Generate
          </button>
          <button
            onClick={() => navigate("/users/id")}
            className="bg-customPurple text-white p-4 text-xl ml-2 rounded hover:bg-purple-800">
            User Profile
          </button>
        </div>
      </div>
    </header>
  );
}
