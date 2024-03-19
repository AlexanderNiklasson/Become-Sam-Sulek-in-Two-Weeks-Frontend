export function WorkoutItem({ workout }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 hover:text-customPurple hover:border border-customPurple flex items-center">
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold mb-2">{workout.name}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Force:</strong> {workout.force}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Level:</strong> {workout.level}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Equipment:</strong> {workout.equipment}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Primary Muscles:</strong> {workout.primaryMuscles.join(", ")}
        </p>
        <div className="flex items-center animate-pulse">
          <a
            href={`/workout/${workout.id}`}
            className="text-purple-500 hover:underline"
          >
            View Details
          </a>
          <img
            src="../src/assets/view-details.png"
            alt="logo"
            className="h-6 w-6 text-customPurple mr-5 ml-2"
          />
        </div>
      </div>
      <img
            src="../src/assets/bee.png"
            alt="logo"
            className="h-64 w-64 text-customPurple mr-5 ml-2"
          />
      {/* Uncomment this below to set the associated correct picture to the DOM */}
      {/* <img
        src={`/${workout.images[0]}`}
        alt={workout.name}
        className="w-32 h-32 object-cover mr-5"
      /> */}
    </div>
  );
}
