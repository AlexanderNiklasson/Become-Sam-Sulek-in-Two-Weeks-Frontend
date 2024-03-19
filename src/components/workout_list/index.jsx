import { useParams } from "react-router-dom";
import { WorkoutItem } from "./workout_item/index";
import { Pagination } from "@mantine/core";

export function WorkoutList({
  workouts,
  currentPage,
  perPage,
  onPageChange,
  showModal,
  setShowModal,
}) {
  const { level } = useParams();

  const filteredWorkouts = workouts.filter(
    (workout) => !level || workout.level.toLowerCase() === level.toLowerCase()
  );

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredWorkouts.length);

  const paginatedWorkouts = filteredWorkouts.slice(startIndex, endIndex);

  return (
    <div>
      <main
        className={` flex-1 flex fixed w-[100%] ${
          showModal ? "z-[1]" : "z-[-1]"
        }`}>
        <div className="w-64 h-screen overflow-y-auto border-r border-gray-300">
          {/* Left Navbar */}
        </div>
        <div className="flex-1 jus overflow-y-auto  ">
          {/* Workout List */}
          <div className="p-5 h-screen overflow-y-auto ">
            <div className="flex justify-center ">
              <Pagination
                total={Math.ceil(filteredWorkouts.length / perPage)}
                value={currentPage}
                onChange={onPageChange}
                color="#81689D"
                className="mb-5"
              />
            </div>
            {paginatedWorkouts.length > 0 ? (
              paginatedWorkouts.map((workout) => (
                <WorkoutItem
                  key={workout.id}
                  workout={workout}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              ))
            ) : (
              <p className="text-gray-700">No workouts available</p>
            )}
            <div className="h-[100px] bg-white"></div>
          </div>
        </div>
        <div className="w-64 h-screen overflow-y-auto border-l border-gray-300 z-[-100]">
          {/* Right User Preferences */}
        </div>
      </main>
    </div>
  );
}
