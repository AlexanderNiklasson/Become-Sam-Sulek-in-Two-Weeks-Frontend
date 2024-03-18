import { useState } from "react";
import { Route, Router, Routes } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import WorkoutGenerator from "./components/workout_generator";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";
import WorkoutList from "./components/workout_list";
import dummyWorkouts  from "./data";

function App() {
  const [workouts, setWorkouts] = useState(dummyWorkouts);
  const [usersPreferences, setUsersPreferences] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <>
      <Header />
      <SideNav />
      <UsersPreferences />
      <Routes>
        <Route path="/"></Route>
        <Route path="/generate" element={<WorkoutGenerator />} />
        <Route path="/workouts" element={<WorkoutList workouts={workouts} setDataFetched={setDataFetched}/>} />
      </Routes>
    </>
  );
}
export default App;
