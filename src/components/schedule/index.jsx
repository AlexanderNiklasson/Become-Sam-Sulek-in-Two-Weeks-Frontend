import { useState, useRef, useEffect } from "react";

export function Schedule() {
  const [days, setDays] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:4000/schedule/1")
      .then((res) => res.json())
      .then((data) => {
        setDays(data);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

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

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <div className="grid grid-cols-3 gap-1 ml-[256px] p-10 w-[70%]">
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
      <div>
        <button className="border-2 p-5">Save</button>
      </div>
    </div>
  );
}
