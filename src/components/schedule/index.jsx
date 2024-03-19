import { useState, useRef, useEffect } from "react";

export function Schedule({ activeUser }) {
  const [days, setDays] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    setIsLoaded(false);
    fetch(`http://localhost:4000/schedule/${activeUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDays(data);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
      }, 1000); // Adjust the time interval as needed (in milliseconds)

      // Clear the timeout when the component unmounts or when showModal becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);

  const handleSort = () => {
    if (dragItem.current !== dragOverItem.current) {
      const _days = [...days.week];
      const draggedDay = _days[dragItem.current];
      const dropTargetDay = _days[dragOverItem.current];

      // Swap exercises between the dragged and drop target days
      const draggedExercises = [...draggedDay.exercises];
      draggedDay.exercises = [...dropTargetDay.exercises];
      dropTargetDay.exercises = draggedExercises;

      const _ids = [...days.ids]; // Copy the ids array

      // Swap ids corresponding to the dragged and drop target days
      const draggedId = _ids[dragItem.current];
      _ids[dragItem.current] = _ids[dragOverItem.current];
      _ids[dragOverItem.current] = draggedId;

      // Update the days state with the modified _days and _ids arrays
      setDays({
        ...days,
        week: _days,
        ids: _ids,
        idsJson: JSON.stringify(_ids),
      });
    }
  };

  const submitChanges = () => {
    fetch("http://localhost:4000/schedule/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(days),
    });
    setShowModal(true);
  };

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="grid grid-cols-3 gap-1 ml-[256px] p-10 w-[70%]">
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg shadow-md transition-opacity duration-100">
            <h1>Saved changes</h1>
          </div>
        </div>
      )}
      {days.week.map((day, index) => (
        <div
          key={`day-${index}`}
          className={`mt-100 ml-200 border-2 border-customPurple p-5 bg-white shadow-md rounded-lg overflow-hidden cursor-move `}
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnd={handleSort}
          onDragEnter={() => (dragOverItem.current = index)}>
          <h2 className="text-black">{day.name}</h2>
          {day.exercises.length === 0 && (
            <h3 className="text-black text-xs ml-1 ">Rest day</h3>
          )}
          {day.exercises.map((exercise, index) => (
            <div
              key={`exercise-${index}`}
              className="border-[1px] border-black mt-2 ">
              <h2 className="text-black text-xs ml-1 mb-2 p-1">
                {exercise.name}
              </h2>
              <h2></h2>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center">
        <button
          className="border-2  h-[50px] w-[120px] mt-20 bg-customPurple text-white  text-xl rounded hover:bg-purple-800"
          onClick={submitChanges}>
          Save
        </button>
      </div>
    </div>
  );
}
