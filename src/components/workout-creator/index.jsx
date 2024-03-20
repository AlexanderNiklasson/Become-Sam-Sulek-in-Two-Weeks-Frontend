import { Tabs } from "@mantine/core";
import WorkoutGenerator from "../workout_generator";
import { Creator } from "./creator";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function WorkoutCreator({ workouts, activeUser }) {
  const [hasSchedule, setHasSchedule] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    fetch(`http://localhost:4000/schedule/${activeUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setHasSchedule(data !== null);
        setIsLoaded(true);
      })
      .catch((error) => {
        setHasSchedule(false);
        setIsLoaded(true);
      });
  }, [activeUser]);
  if (hasSchedule && isLoaded) {
    return (
      <div className="w-100 flex justify-center">
        <div>
          <h2 className="text-customPurple text-3xl mt-[200px]">
            You already have a schedule
          </h2>
          <h2 className="text-customPurple text-2xl text-center">
            Here is{" "}
            <Link
              className="text-customPink underline hover:text-customLightblue"
              to="/schedule">
              your schedule
            </Link>
          </h2>
        </div>
      </div>
    );
  } else if (isLoaded) {
    return (
      <div className="w-100">
        <Tabs
          defaultValue="Generator"
          color="#81689D"
          className="w-[64%] mx-auto mt-3">
          <Tabs.List>
            <Tabs.Tab value="Generator">Generator</Tabs.Tab>
            <Tabs.Tab value="Custom">Create Custom</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Generator">
            <WorkoutGenerator />
          </Tabs.Panel>
          <Tabs.Panel value="Custom">
            <Creator workouts={workouts} activeUser={activeUser} />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
}
