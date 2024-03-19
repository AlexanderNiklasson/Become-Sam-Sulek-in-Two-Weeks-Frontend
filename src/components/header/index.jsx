import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white p-5 border-b border-gray-500 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="../src/assets/header-weight.png"
            alt="logo"
            className="h-12 w-12 text-customPurple mr-5 ml-5 animate-bounce"
          />

          <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-customPurple to-purple-600 bg-clip-text animate-pulse">
            <code>
              Become Sam Sulek In Two Weeks!
            </code>
          </h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/generate")}
            className="bg-customPurple text-white p-4 text-xl rounded hover:bg-purple-800"
          >
            Generate
          </button>
        </div>
      </div>
    </header>
  );
}
