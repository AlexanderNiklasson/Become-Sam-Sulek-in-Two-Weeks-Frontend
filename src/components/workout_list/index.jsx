import { WorkoutItem } from "./workout_item/index";

export function WorkoutList({ workouts }) {
  return (
    <main className="flex-1 flex">
      <div className="w-64 h-screen overflow-y-auto border-r border-gray-300">
        {/* Left Navbar */}
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Workout List */}
        <div className="p-5 h-screen overflow-y-auto">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
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
