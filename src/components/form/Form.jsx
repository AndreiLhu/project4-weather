import { useState } from 'react';
export const Form = ({ onAddActivity }) => {
  const [formData, setFormData] = useState({
    name: '',
    isForGoodWeather: false,
  });

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleWeatherChange = (e) => {
    setFormData({ ...formData, isForGoodWeather: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('target', e.target);
    console.log('form', formData);

    // onAddActivity({ formData });
    const form = e.target;
    let name = form.elements.inputName.value;
    console.log('name', name);
    form.reset();
    name.reset();
    form.elements.inputName.focus();
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Add new Activity:</h4>
        <label htmlFor="inputName">Name:</label>
        <input
          type="text"
          id="inputName"
          name="inputName"
          placeholder="enter your activity"
          value={formData.name}
          onChange={handleNameChange}
          // ref={inputFocus}
        ></input>
        <label htmlFor="inputGoodWeather">Good-weather activity:</label>
        <input
          type="checkbox"
          id="inputGoodWeather"
          onChange={handleWeatherChange}
          checked={formData.isForGoodWeather}
        ></input>
        <input type="submit" value="add Activity"></input>
      </form>
    </>
  );
};
