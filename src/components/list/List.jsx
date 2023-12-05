export default function List({ activities, isGoodWeather, onDeleteActivity }) {
  return (
    <>
      {isGoodWeather === true ? (
        <h2>
          Awesome weather! <br />
          Go outside and:
        </h2>
      ) : (
        <h2>
          Bad weather! <br />
          Stay inside and:
        </h2>
      )}

      <ul className="list__section">
        {activities.map((activity) => (
          <li className="list__item" key={activity.id}>
            {activity.inputName}
            <button
              onClick={() => onDeleteActivity(activity.id)}
              type="button"
              className="list__button"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
