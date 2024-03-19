import { Tabs } from "@mantine/core";
import WorkoutGenerator from "../workout_generator";
import { Creator } from "./creator";

export function WorkoutCreator({ workouts }) {
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
