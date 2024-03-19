import { Tabs } from "@mantine/core";
import WorkoutGenerator from "../workout_generator";
import { Creator } from "./creator";
import { useEffect, useState } from "react";

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
      <div className="w-100">
        <p>You already have a schedule</p>
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
            <Creator workouts={workouts} />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
}
