import React, { useState } from 'react';

export default function ComplexityTable({ workouts }) {
  const [sortedWorkouts, setSortedWorkouts] = useState([...workouts]);
  const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

  const sortBy = (column) => {
    const isAscending = sortOrder.column === column && sortOrder.ascending;
    const sorted = [...sortedWorkouts].sort((a, b) => {
      if (column === 'Complexity') {
        const complexityA = parseFloat(a.complexity.replace(',', '.'));
        const complexityB = parseFloat(b.complexity.replace(',', '.'));
        return isAscending ? complexityA - complexityB : complexityB - complexityA;
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }
    });
    setSortedWorkouts(sorted);
    setSortOrder({ column, ascending: !isAscending });
  };

  return (
    <div className="p-5 h-screen overflow-y-auto">
      <table className="table-auto mx-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => sortBy('Name')}>
              Name {sortOrder.column === 'Name' && (sortOrder.ascending ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => sortBy('Complexity')}>
              Complexity {sortOrder.column === 'Complexity' && (sortOrder.ascending ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedWorkouts.map((workout, index) => (
            <tr key={index} className="border-t border-gray-400">
              <td className="px-4 py-2">{workout.name}</td>
              <td className="px-4 py-2">{workout.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
