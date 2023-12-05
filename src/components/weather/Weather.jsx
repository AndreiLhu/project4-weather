export default function Weather({ weather }) {
  return (
    <div>
      {!weather && <h2>weather is loading...</h2>}
      {weather && (
        <>
          <h1>{weather.condition}</h1>
          <h1>{weather.temperature}</h1>
        </>
      )}
    </div>
  );
}
