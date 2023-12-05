
export const Form = ({ onAddActivity }) => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   isForGoodWeather: false,
  // });

  // const handleNameChange = (e) => {
  //   setFormData({ ...formData, name: e.target.value });
  // };
  // const handleWeatherChange = (e) => {
  //   setFormData({ ...formData, isForGoodWeather: e.target.checked });
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // data.isForGoodWeather= event.target.isForGoodWeather.checked === true
    onAddActivity(data);
    console.log("form", formData);
    console.log("data", data);
    event.target.reset();
    event.target.inputName.focus();
    // let name = form.elements.inputName.value;
    // console.log("name", name);

    // name.reset();
    // form.elements.inputName.focus();
>>>>>>> bb64e1dd9c8c5c48c28a865a8a8d759ddfe93182
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
          // value={formData.name}
          // onChange={handleNameChange}
          // ref={inputFocus}
        ></input>
        <label htmlFor="inputGoodWeather">Good-weather activity:</label>
        <input
          type="checkbox"
          id="inputGoodWeather"
          // onChange={handleWeatherChange}
          // checked={formData.isForGoodWeather}
        ></input>
        <button type="submit">add Activity</button>
      </form>
    </>
  );
};
