import { useNavigate } from "react-router";
import Home from "../home/index.jsx"

export default function WorkoutGenerator() {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <Home/>
          <h2 className="text-xl font-semibold mb-4">Generate Workout</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="field1"
              />
              <input
                className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="field1"
                type="text"
                placeholder="Cardio, push or press?"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="field2"
              />
              <input
                className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="field2"
                type="text"
                placeholder="[B]eginner, [I]ntermediate or [E]xpert?"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="field3"
              />
              <input
                className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="field3"
                type="text"
                placeholder="Duration..."
              />
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="field4"
              />
              <input
                className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="field4"
                type="text"
                placeholder="Exclude specific muscle group..."
              />
            </div>
            <button
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ backgroundColor: "#81689D" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
