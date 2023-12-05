import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/form/Form';
import Weather from './components/weather/Weather';
import { uid } from 'uid';
import useLocalStorageState from 'use-local-storage-state';
import List from './components/list/List';

function App() {
  const [activities, setActivities] = useLocalStorageState('activities', {
    defaultValue: [],
  });
  const [weather, setWeather] = useState();
  const url = 'https://example-apis.vercel.app/api/weather/europe';
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          console.log('data', data);
          setWeather(data);
        } else {
          console.error('bad response');
        }
      } catch (error) {
        console.error('error');
      }
    }

    const intervalID = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);
  const isGoodWeather = weather?.isGoodWeather;

  const goodWeatherActivities = activities.filter(
    (activity) => activity.inputGoodWeather === true
  );
  const badWeatherActivities = activities.filter(
    (activity) => activity.inputGoodWeather === false
  );

  function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id));
  }
  function handleAddActivity(newActivity) {
    setActivities([...activities, { id: uid(), ...newActivity }]);
  }

  return (
    <>
      <h1>main app</h1>
      <Form onAddActivity={handleAddActivity} />
      <Weather weather={weather} />
      <List
        isGoodWeather={isGoodWeather}
        activities={
          isGoodWeather ? goodWeatherActivities : badWeatherActivities
        }
        onDeleteActivity={handleDeleteActivity}
      />
    </>
  );
}

export default App;
