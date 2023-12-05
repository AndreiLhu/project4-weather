import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/form/Form";
import useLocalStorageState from "use-local-storage-state";
import Weather from "./components/weather/Weather";
import { uid } from "uid";

function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [weather, setWeather] = useState();
  const url = "https://example-apis.vercel.app/api/weather/europe";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setWeather(data);
        } else {
          console.error("bad response");
        }
      } catch (error) {
        console.error("error");
      }
    }

    const intervalID = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id));
  }
  function handleAddActivity(newActivity) {
    setActivities([...activities, { id: uid(), ...newActivity }]);
  }

  // onAddActivity, activities, isGoodWeather, onDeleteActivity ;
  return (
    <>
      <h1>main app</h1>
      <Form onAddActivity={handleAddActivity} />
      <Weather weather={weather} />
    </>
  );
}

export default App;
