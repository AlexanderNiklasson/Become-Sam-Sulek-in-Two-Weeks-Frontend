import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function UsersTable({ users }) {
  const [sortedUsers, setSortedUsers] = useState([...users]);
  const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });
  document.body.style.overflow = "hidden";

  const sortBy = (column) => {
    const isAscending = sortOrder.column === column && sortOrder.ascending;
    const sorted = [...sortedUsers].sort((a, b) => {
      if (column === "Level") {
        const levelA = a.level.toLowerCase();
        const levelB = b.level.toLowerCase();
        return isAscending
          ? levelA.localeCompare(levelB)
          : levelB.localeCompare(levelA);
      } else {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        return isAscending
          ? usernameA.localeCompare(usernameB)
          : usernameB.localeCompare(usernameA);
      }
    });
    setSortedUsers(sorted);
    setSortOrder({ column, ascending: !isAscending });
  };

  return (
    <div className="p-5 h-screen overflow-y-auto">
      <table className="table-auto mx-auto border-collapse border border-gray-400 rounded-lg shadow-lg">
        <thead className="">
          <tr>
            <th
              className="px-4 py-2 cursor-pointer text-left text-black"
              onClick={() => sortBy("Username")}>
              Username{" "}
              {sortOrder.column === "Username" &&
                (sortOrder.ascending ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer text-left text-black"
              onClick={() => sortBy("Level")}>
              Level{" "}
              {sortOrder.column === "Level" &&
                (sortOrder.ascending ? "↑" : "↓")}
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="px-4 py-2">
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-500 hover:text-blue-700">
                  {user.username}
                </Link>
              </td>
              <td className="px-4 py-2">{user.level}</td>
              <td className="px-4 py-2">
                <button className="bg-gradient-to-r from-customPink to-customPurple hover:from-customPink hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg">
                  <Link to={`/schedule/${user.id}`}>Check Schedule</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
