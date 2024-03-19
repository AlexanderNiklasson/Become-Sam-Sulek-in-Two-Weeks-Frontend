import { useState, useEffect } from "react";

export function WorkoutItem({ workout, showModal, setShowModal }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${workout.images[0]}`,
    `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${workout.images[1]}`,
  ]);
  const [thisShowModal, setThisShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 hover:text-customPurple hover:border-gray-700 border-transparent border-[1px] border-customPurple flex items-center">
      {thisShowModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[3]">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-10"></div>{" "}
          {/* Semi-transparent overlay */}
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  overflow-y-auto">
            <div className="w-2/4 h-3/4 bg-white p-10 rounded-lg shadow-md max-w-full max-h-full overflow-auto">
              <img
                src={`${images[currentImageIndex]}`}
                alt="logo"
                className="h-[350px]  aspect-auto text-customPurple  border-2 border-black mx-auto"
              />
              <h1 className="text-3xl mt-3 text-customPurple mb-2">
                {workout.name}
              </h1>
              {workout.instructions.map((instruction, index) => (
                <>
                  <p>
                    {index + 1}. {instruction}
                  </p>
                  <br />
                </>
              ))}

              <button
                onClick={() => {
                  setShowModal(false);
                  setThisShowModal(false);
                }}
                className="border-2 h-[50px] w-[120px]  bg-customPurple text-white text-xl rounded hover:bg-purple-800">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
        <p className="text-gray-700 mb-2">
          <strong>Complexity:</strong> {workout.complexity}
        </p>
        <div className="flex items-center animate-pulse">
          <button
            onClick={() => {
              setShowModal(true);
              setThisShowModal(true);
            }}
            className="text-purple-500 hover:underline">
            View Details
          </button>
          <img
            src="../src/assets/view-details.png"
            alt="logo"
            className="h-6 w-6 text-customPurple mr-5 ml-2"
          />
        </div>
      </div>
      <img
        src={`${images[currentImageIndex]}`}
        alt="logo"
        className="h-40 w-40 text-customPurple mr-5 ml-2 border-2 border-black"
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
