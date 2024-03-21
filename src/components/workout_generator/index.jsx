import { useState } from "react";
import { useNavigate } from "react-router";
import Home from "../home/index.jsx";
import done from "../../../public/assets/done.png";

export default function WorkoutGenerator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "arnold",
    level: "beginner",
    duration: 0,
    exclude: "",
    ownerId: localStorage.getItem("id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Pre-test log before attempting post request");
    fetch(`http://localhost:4000/schedule/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        console.log("Mid-test log to log if POST response was OK");
        //setDataFetched(false);
        setFormData({
          type: "",
          level: "",
          duration: 0,
          exclude: [],
        });
        navigate(`/schedule/${localStorage.getItem("id")}`);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <Home />
        <h2 className="text-xl font-semibold mb-4">Generate Workout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="field1"
            />
            <select
              className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="field1"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Which split do you want?">
              <option value="arnold">Arnold</option>
              <option value="ppl">PPL</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="field2"
            />
            <select
              className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="field2"
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="Which difficulty?">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="field3"
            />
            <input
              className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="field3"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration..."
            />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="field4"
            />
            <input
              className="appearance-none border rounded border-purple-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="field4"
              type="text"
              name="exclude"
              value={formData.exclude}
              onChange={handleChange}
              placeholder="Exclude specific muscle group..."
            />
          </div>
          <button
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            style={{ backgroundColor: "white" }}>
            <div className="flex items-center">
              <img
                src={done}
                alt="logo"
                className="h-10 w-10 text-customPurple animate-pulse"
              />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
