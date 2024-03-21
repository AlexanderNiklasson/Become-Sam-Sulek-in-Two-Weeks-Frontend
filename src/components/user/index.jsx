import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function User({ users }) {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users && id) {
      const matchingUser = users.find((user) => Number(user.id) === Number(id));

      setSelectedUser(matchingUser);
    }
  }, [users, id]);

  return (
    selectedUser && (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 ">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-customPink to-customPurple shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <img
                  className="h-24 w-24 rounded-full mx-auto"
                  src={`https://i.pravatar.cc/150?u=${selectedUser.username}`}
                  alt=""
                />
              </div>
              <div className="text-center mt-5">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {selectedUser.username}
                </h1>
                <p className="mt-2 text-sm text-gray-500 ">
                  Exercise Style | <b>{selectedUser.type}</b> <br/> 
                  Skill Level | <b>{selectedUser.level}</b> <br/>
                  Workout Length| <b>{selectedUser.duration} minutes</b>
                </p>
              </div>
              <div className="mt-8">
                <div className="flex justify-between">
                  <div className="w-1/2">
                    <p className="font-semibold text-sm text-gray-600">
                      <Link to={`/schedule/${selectedUser.id}`}>
                        Check Schedule
                      </Link>
                    </p>
                    <p className="mt-1 text-sm text-gray-900">{/* Add more stuff if wanted here */}</p>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
