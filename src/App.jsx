import { useState } from "react";
import { Route, Router, Routes } from "react-router";
import "./App.css";
import WorkoutGenerator from "./components/workout_generator";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <>
    <Routes>
      <Route path="/"></Route>
      <Route path="/generate" element={<WorkoutGenerator/>}/>
    </Routes>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <span className="inline-grid grid-cols-3 gap-4 hover:bg-red-700">
        <span className="border-solid border-2 border-black rounded p-5 hover:bg-red-700">
          01
        </span>
        <span className="border-solid border-2 border-black rounded p-5">
          02
        </span>
        <span className="border-solid border-2 border-black rounded p-5">
          03
        </span>
        <span className="border-solid border-2 border-black rounded p-5">
          04
        </span>
        <span className="border-solid border-2 border-black rounded p-5">
          05
        </span>
        <span className="border-solid border-2 border-black rounded p-5">
          06
        </span>
      </span>
      <span className="inline-grid grid-cols-3 gap-4 ">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="border-solid border-2 border-black rounded p-5 hover:bg-gray-800">
            0{i}
          </span>
        ))}
      </span>
    </>
  );
}
export default App;
