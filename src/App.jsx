import { useState } from "react";
import { Route, Router, Routes } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import WorkoutGenerator from "./components/workout_generator";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";
import { Schedule } from "./components/schedule";

function App() {
  const [workouts, setWorkouts] = useState([]);
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
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
}
export default App;
