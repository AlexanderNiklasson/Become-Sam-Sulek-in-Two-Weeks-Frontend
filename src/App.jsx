import { useState } from "react";
import { Route, Router, Routes } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import WorkoutGenerator from "./components/workout_generator";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [usersPreferences, setUsersPreferences] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <>
      <Header />
      <SideNav />
      <Routes>
        <Route path="/"></Route>
        <Route path="/generate" element={<WorkoutGenerator />} />
      </Routes>
    </>
  );
}
export default App;
