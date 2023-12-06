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
  const [continent, setContinent] = useState('');

  function handleContinentChange(event) {
    console.log('selected continent', event.target.value);
    setContinent(event.target.value);
  }

  const url = `https://example-apis.vercel.app/api/weather/${continent}`;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          setWeather(data);
        } else {
          console.error('bad response');
        }
      } catch (error) {
        console.error('error');
      }
    }

    const intervalID = setInterval(fetchData, 5000);
    return () => {
      clearInterval(intervalID);
    };
  }, [url]);
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
    <div
      id="weather-container"
      className={isGoodWeather ? 'good-weather' : 'bad-weather'}
    >
      <h1>Weather App</h1>
      <Form onAddActivity={handleAddActivity} />
      <form className="form-weather">
        <h4 className="location-weather"> Choose a location:</h4>
        <select
          value={continent}
          onChange={handleContinentChange}
          className="continent-input"
        >
          <option value="europe">Europe</option>
          <option value="arctic">Arctic</option>
          <option value="sahara">Sahara</option>
          <option value="rainforest">Rainforest</option>
        </select>
      </form>
      <Weather weather={weather} />
      <List
        isGoodWeather={isGoodWeather}
        activities={
          isGoodWeather ? goodWeatherActivities : badWeatherActivities
        }
        onDeleteActivity={handleDeleteActivity}
      />
    </div>
  );
}

export default App;
