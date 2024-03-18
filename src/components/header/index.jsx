import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white p-5 border-b border-gray-500 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl mt-2 font-bold underline text-black">
            Workout
          </h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/generate")}
            className="bg-customPurple text-white p-4 text-xl rounded hover:bg-purple-800">
            Generate
          </button>
        </div>
      </div>
    </header>
  );
}
