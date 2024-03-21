import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import headerWeight from "../../../public/assets/dumbell.png";

export function Header({ showModal }) {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <div></div>;
  }
  return (
    <header
      className={`bg-white p-5 border-b border-gray-500 ${
        showModal ? "z-[-1]" : "z-[1]"
      }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={headerWeight}
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
            className="bg-gradient-to-r from-customPurple to-customPink hover:from-pink-500 hover:to-customPink text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg mr-2">
            Generate
          </button>
          <button
            onClick={() => navigate(`/users/${localStorage.getItem("id")}`)}
            className="bg-gradient-to-r from-customPink to-customPurple hover:from-customPink hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg ml-2">
            User Profile
          </button>
        </div>
      </div>
    </header>
  );
}
