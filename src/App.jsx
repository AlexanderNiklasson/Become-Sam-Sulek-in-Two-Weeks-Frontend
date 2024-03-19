import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import WorkoutGenerator from "./components/workout_generator";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";
import { Schedule } from "./components/schedule";
import { WorkoutList } from "./components/workout_list";
import dummyWorkouts from "./data";

function App() {
  const [workouts, setWorkouts] = useState(dummyWorkouts);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 2;
  const [usersPreferences, setUsersPreferences] = useState({});
  const [dataFetched, setDataFetched] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <SideNav />
      <UsersPreferences />
      <Routes>
        <Route path="/"></Route>
        <Route path="/generate" element={<WorkoutGenerator />} />
        <Route
          path="/workouts"
          element={
            <WorkoutList
              workouts={workouts}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
              setDataFetched={setDataFetched}
            />
          }
        />
        <Route
          path="/workouts/:level"
          element={
            <WorkoutList
              workouts={workouts}
              currentPage={currentPage}
              perPage={perPage}
              onPageChange={handlePageChange}
              setDataFetched={setDataFetched}
            />
          }
        />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </>
  );
}

export default App;
