export const Form = ({ onAddActivity }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.inputGoodWeather = event.target.inputGoodWeather.checked === true;
    onAddActivity(data);
    console.log('form', formData);
    console.log('data', data);
    event.target.reset();
    event.target.inputName.focus();
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
          required
        ></input>
        <label htmlFor="inputGoodWeather">Good-weather activity:</label>
        <input
          type="checkbox"
          id="inputGoodWeather"
          name="inputGoodWeather"
        ></input>
        <button type="submit">add Activity</button>
      </form>
    </>
  );
};
