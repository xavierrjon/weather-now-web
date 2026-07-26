import "./index.scss";

export default function WeatherInfo({ weather }) {
  const capitalize = (text) =>
    text
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

  const description = capitalize(weather.weather[0].description);

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <h2 className="weather-title">
        Hoje, {currentDate}
      </h2>

      <div className="weather-card">
        <div className="weather-left">
          <h2 className="city-name">{weather.name}</h2>

          <div className="weather-details">
            <p>Sensação: {Math.round(weather.main.feels_like)}°C</p>
            <p>Umidade: {weather.main.humidity}%</p>
            <p>Pressão: {weather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="weather-right">
          <div className="temperature-row">
            <p className="temperature">{Math.round(weather.main.temp)}°</p>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={description}
            />
          </div>

          <p className="description">{description}</p>
        </div>
      </div>
    </>
  );
}