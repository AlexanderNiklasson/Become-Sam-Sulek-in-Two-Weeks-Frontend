import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../auth";
import navHouse from "../../../public/assets/nav-house.svg";
import navSchedule from "../../../public/assets/nav-schedule.svg";
import navWorkouts from "../../../public/assets/nav-workouts.svg";
import navUser from "../../../public/assets/nav-user.svg";
import navHighscore from "../../../public/assets/nav-highscore.svg";
import navLogout from "../../../public/assets/logout.svg";

/**
 * Represents the SideNav component.
 * - Displays a side navigation menu with links to various pages.
 * - Renders differently based on user authentication status.
 * - Provides links to the home page, user schedule, workouts, difficulty levels, users, complexity rankings, and logout functionality.
 * @param showModal A boolean indicating whether to show a modal.
 * @param handleLogout Function to call upon logout.
 * @returns The SideNav component containing links to various pages and logout functionality based on user authentication status.
 */

export function SideNav({ showModal, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    return <div></div>;
  }

  return (
    <div
      className={`fixed top-[88px] left-0 h-full w-64 bg-gray-100 text-white p-10 border-t border-gray-500 ${
        showModal ? "z-[-1]" : "z-[1]"
      }`}>
      <div>
        <ul className="space-y-4 min-h-[280px] ml-3">
          <li className="flex">
            <img
              src={navHouse}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2"
            />
            <Link
              to={"/"}
              className="underline text-customPurple hover:no-underline ">
              Home
            </Link>
          </li>
          <li className="flex">
            <img
              src={navSchedule}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={`/schedule/${localStorage.getItem("id")}`}
              className="underline text-customPurple hover:no-underline ">
              <code>Schedule</code>
            </Link>
          </li>
          <li className="flex">
            <img
              src={navWorkouts}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"workouts"}
              className="underline text-customPurple hover:no-underline">
              Workouts
            </Link>
          </li>
          <li>
            <div className="flex">
              <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={() => {}}
                className={`underline hover:no-underline text-customPurple ${
                  isOpen ? "text-gray-500" : "text-customPurple"
                }`}>
                Difficulty
              </button>

              {isOpen ? (
                <span className="text-customPurple ml-10 mt-1.5">↓</span>
              ) : (
                <span className="text-customPurple ml-10 mt-1.5">↑</span>
              )}
            </div>

            {isOpen && (
              <ul className="space-y-4 ml-4 mt-5">
                {["Beginner", "Intermediate", "Expert"].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/workouts/${item.toLowerCase()}`} // Pass level as a parameter
                      className="text-customPurple underline hover:no-underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div>
        <ul className="space-y-4 mt-20">
          <li className="flex">
            <img
              src={navUser}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"/users"}
              className="text-customPurple underline hover:no-underline">
              Users
            </Link>
          </li>
          <li className="flex">
            <img
              src={navHighscore}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"/complexity/table"}
              className="text-customPurple underline hover:no-underline">
              Complexity Rankings
            </Link>
          </li>
          <li className="flex">
            <img
              src={navLogout}
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <button
              onClick={() => {
                logout();
                handleLogout();
                navigate("/login");
              }}
              className="text-customPurple underline hover:no-underline">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
