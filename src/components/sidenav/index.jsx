import { useState } from "react";
import { Link } from "react-router-dom";

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-[100px] left-0 h-full w-64 bg-gray-100 text-white p-10 border-t border-gray-500 ">
      <div>
        <ul className="space-y-4 min-h-[280px] ml-3">
          <li className="flex">
            <img
              src="../src/assets/nav-house.svg"
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
              src="../src/assets/nav-schedule.svg"
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"/schedule"}
              className="underline text-customPurple hover:no-underline ">
              Schedule
            </Link>
          </li>
          <li className="flex">
            <img
              src="../src/assets/nav-workouts.svg"
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

              <img
                src="../src/assets/nav-triangle-open.svg"
                className={`h-3 w-3 text-customPurple ml-10 mt-1.5 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                alt="arrow"
              />
            </div>

            {isOpen && (
              <ul className="space-y-4 ml-4 mt-5">
                {["Easy", "Intermediate", "Expert"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="/"
                      className="text-customPurple underline hover:no-underline">
                      {item}
                    </a>
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
              src="../src/assets/nav-user.svg"
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"/"}
              className="text-customPurple underline hover:no-underline">
              Users
            </Link>
          </li>
          <li className="flex">
            <img
              src="../src/assets/nav-highscore.svg"
              alt="logo"
              className="h-6 w-6 text-customPurple mr-2 "
            />
            <Link
              to={"/"}
              className="text-customPurple underline hover:no-underline">
              Highscore
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
