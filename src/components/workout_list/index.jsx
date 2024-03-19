import { useParams } from "react-router-dom";
import { WorkoutItem } from "./workout_item/index";

export function WorkoutList({ workouts, currentPage, perPage, onPageChange }) {
  const { level } = useParams();

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return (
    <main className="flex-1 flex">
      <div className="w-64 h-screen overflow-y-auto border-r border-gray-300">
        {/* Left Navbar */}
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Workout List */}
        <div className="p-5 h-screen overflow-y-auto">
          <div className="flex justify-center">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <img
                src="../src/assets/left-arrow.png"
                alt="logo"
                className="h-12 w-12 text-customPurple mr-2 ml-2 mb-2 opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
            <div className="bg-white px-2 py-3 rounded-md shadow-sm">{currentPage}</div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={endIndex >= workouts.length}
            >
              <img
                src="../src/assets/right-arrow.png"
                alt="logo"
                className="h-12 w-12 text-customPurple mr-2 ml-2 mb-2 opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </div>
          {workouts && workouts.length > 0 ? (
            workouts
              .filter(
                (workout) =>
                  !level || workout.level.toLowerCase() === level.toLowerCase()
              )
              .slice(startIndex, endIndex)
              .map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} />
              ))
          ) : (
            <p className="text-gray-700">No workouts available</p>
          )}
        </div>
      </div>
      <div className="w-64 h-screen overflow-y-auto border-l border-gray-300">
        {/* Right User Preferences */}
      </div>
    </main>
  );
}
