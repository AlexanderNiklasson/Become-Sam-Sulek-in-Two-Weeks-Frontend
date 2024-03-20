import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export function Schedule() {
  const [days, setDays] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Check if token exists
    if (token) {
      fetch(`http://localhost:4000/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDays(data);
        })
        .catch((error) => {
          setDays([]);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } else {
      // Handle case where token is missing (e.g., redirect to login page)
    }
  }, [id]);

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
    fetch(`http://localhost:4000/schedule/${localStorage.getItem("id")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(days),
    });
    console.log(days);
    setModalContent("Schedule saved");
    setShowModal(true);
  };

  const submitDelete = () => {
    fetch(`http://localhost:4000/schedule/${localStorage.getItem("id")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      setModalContent("Schedule deleted");
      navigate(`/generate`);
    });
  };

  if (!isLoaded) return <h1>Loading...</h1>;

  if (!days.week)
    return (
      <div className="w-[100%] mt-[280px] flex justify-center flex-col">
        <h1 className="text-5xl mx-auto text-customPurple">
          No schedule found
        </h1>
        {id === localStorage.getItem("id") && (
          <h2 className="text-3xl mx-auto text-customPurple">
            Please{" "}
            <Link
              className="text-customPink underline hover:text-customLightblue"
              to={"/generate"}>
              generate
            </Link>
            &nbsp;one
          </h2>
        )}
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 ml-[256px] p-10 w-[70%]">
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-md transition-opacity duration-100">
              <h1>{modalContent}</h1>
            </div>
          </div>
        )}
        {days.week.map((day, index) => (
          <div
            key={`day-${index}`}
            className={`border-2 border-customPurple p-5 bg-white shadow-md rounded-lg overflow-hidden ${
              id === localStorage.getItem("id") ? "cursor-move" : ""
            }`}
            draggable={id === localStorage.getItem("id") ? true : false}
            onDragStart={() => (dragItem.current = index)}
            onDragEnd={handleSort}
            onDragEnter={() => (dragOverItem.current = index)}>
            <h2 className="text-black">{day.name}</h2>
            {day.exercises.length === 0 && (
              <h3 className="text-black text-xs ml-1">Rest day</h3>
            )}
            {day.exercises.map((exercise, exerciseIndex) => (
              <div
                key={`exercise-${exerciseIndex}`}
                className="border-[1px] border-black mt-2">
                <h2 className="text-black text-xs ml-1 mb-2 p-1">
                  {exercise.name}
                </h2>
                <h2></h2>
              </div>
            ))}
          </div>
        ))}
        {id === localStorage.getItem("id") && (
          <div className="flex justify-center flex-row mt-5">
            <button
              className="border-2 h-[50px] w-[120px] mx-auto bg-customPurple text-white text-xl rounded hover:bg-purple-800"
              onClick={submitChanges}>
              Save
            </button>
            <button
              className="border-2 h-[50px] w-[120px] mx-auto bg-customPurple text-white text-xl rounded hover:bg-purple-800"
              onClick={submitDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
