import React, { useState } from 'react';

export default function UsersTable({ users }) {
  const [sortedUsers, setSortedUsers] = useState([...users]);
  const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

  const sortBy = (column) => {
    const isAscending = sortOrder.column === column && sortOrder.ascending;
    const sorted = [...sortedUsers].sort((a, b) => {
      if (column === 'Level') {
        const levelA = a.level.toLowerCase();
        const levelB = b.level.toLowerCase();
        return isAscending ? levelA.localeCompare(levelB) : levelB.localeCompare(levelA);
      } else {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();
        return isAscending ? usernameA.localeCompare(usernameB) : usernameB.localeCompare(usernameA);
      }
    });
    setSortedUsers(sorted);
    setSortOrder({ column, ascending: !isAscending });
  };

  return (
    <div className="p-5 h-screen overflow-y-auto">
      <table className="table-auto mx-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => sortBy('Username')}>
              Username {sortOrder.column === 'Username' && (sortOrder.ascending ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => sortBy('Level')}>
              Level {sortOrder.column === 'Level' && (sortOrder.ascending ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2">See Schedule</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.level}</td>
              <td className="px-4 py-2">
                <button>See Schedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
