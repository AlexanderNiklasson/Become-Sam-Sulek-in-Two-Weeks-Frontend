import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import UsersPreferences from "./components/users_preferences";
import { Header } from "./components/header";
import { SideNav } from "./components/sidenav";
import { Schedule } from "./components/schedule";
import { WorkoutList } from "./components/workout_list";
import { Dashboard } from "./components/dashboard";
import ComplexityTable from "./components/complexity_table";
import User from "./components/user";
import UsersTable from "./components/users_table";
import Login from "./components/login";
import { WorkoutCreator } from "./components/workout-creator";
import { isAuthenticated } from "./auth";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;
  const [usersPreferences, setUsersPreferences] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(null);
  const [activeUser, setActiveUser] = useState(null); // Track active user
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Check if user is authenticated before performing any action
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      navigate("/login");
      return;
    }

    // If the user is authenticated, proceed with data fetching
    if (!dataFetched) {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      Promise.all([
        fetch("http://localhost:4000/exercise", { headers }).then((response) =>
          response.json()
        ),
        fetch("http://localhost:4000/users", { headers }).then((response) =>
          response.json()
        ),
      ])
        .then(([workoutsData, usersData]) => {
          setWorkouts(workoutsData);
          setUsers(usersData);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [dataFetched, loginSuccess]);

  const handleLoginSuccess = (userData) => {
    setActiveUser(userData);
    setDataFetched(false);
    setLoginSuccess(true);
    // You may perform additional actions after successful login if needed
  };

  const handleLogout = () => {
    setLoginSuccess(false);
  };

  return (
    <>
      {isAuthenticated() && (
        <>
          <Header showModal={showModal} setShowModal={setShowModal} />
          <SideNav
            showModal={showModal}
            setShowModal={setShowModal}
            handleLogout={handleLogout}
          />
          <UsersPreferences showModal={showModal} setShowModal={setShowModal} />
        </>
      )}

      <Routes>
        {isAuthenticated() ? ( // Render components only if authenticated
          <>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/generate"
              element={
                <WorkoutCreator workouts={workouts} activeUser={activeUser} />
              }
            />
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
              path="/schedule/:id"
              element={<Schedule activeUser={activeUser} />}
            />
            <Route
              path="/complexity/table"
              element={<ComplexityTable workouts={workouts} />}
            />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/users" element={<UsersTable users={users} />} />
          </>
        ) : (
          // Render login component if not authenticated
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
        )}
      </Routes>
    </>
  );
}

export default App;
