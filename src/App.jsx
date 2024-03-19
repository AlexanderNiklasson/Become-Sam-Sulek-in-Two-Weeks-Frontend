import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import WorkoutGenerator from "./components/workout_generator";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";
import { Schedule } from "./components/schedule";
import { WorkoutList } from "./components/workout_list";
import { Dashboard } from "./components/dashboard";
import { Footer } from "./components/footer";
import ComplexityTable from "./components/complexity_table";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;
  const [usersPreferences, setUsersPreferences] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeUser] = useState({
    id: 1,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!dataFetched) {
      fetch("http://localhost:4000/exercise")
        .then((response) => response.json())
        .then((data) => {
          setWorkouts(data);
          setDataFetched(true);
        });
    }
  }, [dataFetched]);

  if (!dataFetched) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Header showModal={showModal} setShowModal={setShowModal} />
        <SideNav showModal={showModal} setShowModal={setShowModal} />
        <UsersPreferences showModal={showModal} setShowModal={setShowModal} />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
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
                showModal={showModal}
                setShowModal={setShowModal}
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
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          />
          <Route
            path="/schedule"
            element={<Schedule activeUser={activeUser} />}
          />
          <Route path="/complexity/table" element={<ComplexityTable workouts={workouts}/>} />
        </Routes>
      </>
    );
  }
}

export default App;
