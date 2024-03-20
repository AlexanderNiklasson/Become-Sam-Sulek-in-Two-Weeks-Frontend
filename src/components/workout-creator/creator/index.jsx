import {
  Modal,
  ScrollArea,
  Popover,
  TextInput,
  UnstyledButton,
  Text,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";

export function Creator({ workouts, activeUser }) {
  const navigate = useNavigate();
  const [days] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  const [selectedDay, setSelectedDay] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const viewportRef = useRef(null);
  const [query, setQuery] = useState("");
  const [openedSearch, setOpenedSearch] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [exercises, setExercises] = useState([[], [], [], [], [], [], []]);

  const filtered = workouts
    .filter((workout) =>
      workout.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((workout, index) => ({ id: index, name: workout.name }));

  const items =
    query !== "" && filtered.length > 0 ? (
      filtered.map((exercise, index) => (
        <UnstyledButton
          data-list-item
          key={exercise.id}
          display="block"
          bg={index === hovered ? "var(--mantine-color-blue-light)" : undefined}
          w="100%"
          p={5}
          onClick={() => {
            setExercises((current) => {
              const copy = current.slice();
              copy[selectedDay] = [...copy[selectedDay], exercise];

              return copy;
            });
            setQuery("");
            close();
          }}>
          <Text>{exercise.name}</Text>
        </UnstyledButton>
      ))
    ) : (
      <Text c="dimmed">Nothing found</Text>
    );

  const submitChanges = () => {
    if (exercises.length === 0) return;

    const ids = exercises.map((exercise) => exercise.map(({ id }) => id));

    const requestBody = {
      name: `${activeUser.id}'s schedule`,
      ownerId: activeUser.id,
      ids: ids,
    };

    console.log("Request Body:", JSON.stringify(requestBody)); // Log the body

    fetch("http://localhost:4000/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then(() => {
      navigate("/schedule");
    });
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={`${days[selectedDay]}`}
        size={500}>
        <Popover width="target" opened={opened}>
          <Popover.Target>
            <TextInput
              value={query}
              onFocus={() => setOpenedSearch(true)}
              onBlur={() => setOpenedSearch(false)}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                setHovered(-1);
              }}
              placeholder="Search exercises.."
            />
          </Popover.Target>
          <Popover.Dropdown p={0}>
            <ScrollArea.Autosize
              viewportRef={viewportRef}
              mah={200}
              type="always"
              scrollbars="y">
              <Box px="xs" py={5}>
                {items.length > 0 ? (
                  items
                ) : (
                  <Text c="dimmed">Nothing found</Text>
                )}
              </Box>
            </ScrollArea.Autosize>
          </Popover.Dropdown>
        </Popover>
        <div className="h-[200px] bg-white"></div>
      </Modal>
      <div className="grid grid-cols-3 gap-2 mt-3 ">
        {days.map((day, index) => (
          <div key={index} className="border-2 p-2 justify-self-auto  ">
            <button
              onClick={() => {
                setSelectedDay(index);
                open();
              }}
              className="w-[100%] hover:underline">
              <h1>{day}</h1>
            </button>

            <div>
              {exercises[index].map((exercise, i) => (
                <div key={i} className="border-2 p-2 flex justify-between mt-2">
                  <p>{exercise.name}</p>
                  <button
                    className="hover:text-red-500"
                    onClick={() => {
                      setExercises((current) => {
                        const copy = current.slice();
                        copy[index] = copy[index].filter(
                          (item) => item.id !== exercise.id
                        );

                        return copy;
                      });
                    }}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="border-2 h-[50px] w-[120px] mt-20 bg-customPurple text-white text-xl rounded hover:bg-purple-800"
        onClick={submitChanges}>
        Save
      </button>
    </div>
  );
}