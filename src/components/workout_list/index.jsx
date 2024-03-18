import WorkoutItem from "./workout_item/index";

export default function WorkoutList(props) {
    const { workouts, setDataFetched } = props;
    console.log("Test logging of top of workoutlist component")

    return (
    <main className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))
        ) : (
          <p className="text-gray-700">No workouts available</p>
        )}
      </div>
    </main>
  );
}