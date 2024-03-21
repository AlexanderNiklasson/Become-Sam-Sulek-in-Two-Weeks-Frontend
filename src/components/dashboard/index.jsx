import { useEffect, useState } from "react";
import samSulek from "../../../public/assets/samsulek.png";

/**
 * Represents the Dashboard component.
 * - Displays a personalized welcome message for the selected user.
 * - Retrieves the user's ID from local storage and matches it with the users' data to identify the selected user.
 * - Renders the welcome message and an image.
 * @param users The array of users from which to identify the selected user.
 * @returns The Dashboard component displaying a personalized welcome message and an image.
 */

export function Dashboard({ users }) {
  const id = localStorage.getItem("id");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users && id) {
      const matchingUser = users.find((user) => Number(user.id) === Number(id));
      setSelectedUser(matchingUser);
    }
  }, [users, id]);

  return (
    selectedUser && (
      <div>
        <div className="mt-[100px] text-center">
          <h1 className="text-customPurple text-6xl ml-[100px]">
            Welcome, {selectedUser.username}!
          </h1>
          <h1 className="text-customPurple text-4xl ml-[100px]">
            Time to get swole.
          </h1>
        </div>
        <div className="fixed bottom-0 left-0 z-[-1] w-full bg-transparent ">
          <img
            src={samSulek}
            alt="samsulek"
            className="w-3/5 mx-auto animate-pulse select-none "
          />
        </div>
      </div>
    )
  );
}
