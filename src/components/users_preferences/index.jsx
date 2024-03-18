import { useState } from "react";

export default function UsersPreferences() {
  const [usersPreferences, setUsersPreferences] = useState({
    type: "",
    level: "",
    duration: ""
  });

  const handleChange = (e) => {
    console.log(usersPreferences);
    setUsersPreferences({
      ...usersPreferences,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed top-0 right-0 h-screen overflow-y-auto bg-white shadow-md rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Users Preferences</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Select workout type
            </label>
            <select
              id="type"
              name="type"
              value={usersPreferences.type}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Select Type --</option>
              <option value="Cardio">Cardio</option>
              <option value="Push">Push</option>
              <option value="Press">Press</option>
            </select>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Select difficulty level
            </label>
            <select
              id="level"
              name="level"
              value={usersPreferences.level}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Select Level --</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Select workout duration
            </label>
            <select
              id="duration"
              name="duration"
              value={usersPreferences.duration}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- Select Duration --</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
