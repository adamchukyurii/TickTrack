import "./App.css";
import { useState, useEffect } from "react";

import Icon from "@mdi/react";
import { mdiWeatherSunny, mdiWeatherNight } from "@mdi/js";

import Button from "react-bootstrap/Button";

import Person from "./Person";
import TimeView from "./TimeView";
import Chart from "./Chart";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTimeout(() => setCurrentDate(new Date()), 5000);
  }, [currentDate]);

  const personList = [
    {
      name: "Petr",
      position: "general director",
      gender: "m",
      avatar: "https://www.svgrepo.com/show/420364/avatar-male-man.svg",
    },
    {
      name: "Ivo",
      position: "sales manager",
      gender: "m",
      avatar: "https://www.svgrepo.com/show/427078/avatar.svg",
    },
    {
      name: "Karel",
      position: "marketing manager",
      gender: "m",
      avatar: "https://www.svgrepo.com/show/427083/avatar.svg",
    },
    {
      name: "Hana",
      position: "sales representative",
      gender: "f",
      avatar: "https://www.svgrepo.com/show/427085/avatar.svg",
    },
    {
      name: "Jana",
      position: "project manager",
      gender: "f",
      avatar: "https://www.svgrepo.com/show/427086/avatar.svg",
    },
    {
      name: "Antonín",
      position: "asistant",
      gender: "m",
      avatar: "https://www.svgrepo.com/show/427080/avatar.svg",
    },
  ];
  const personComponentList = personList.map((item) => (
    <Person person={item} theme={theme} />
  ));

  return (
    <div>
      <TimeView currentDate={currentDate} />
      <Button onClick={() => setCurrentDate(new Date())}>update</Button>
      <Button
        variant={theme === "light" ? "dark" : "light"}
        onClick={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      >
        <Icon
          path={theme === "light" ? mdiWeatherNight : mdiWeatherSunny}
          title="User Profile"
          size={1}
        />
      </Button>
      {personComponentList}
      <Chart />
    </div>
  );
}

export default App;
