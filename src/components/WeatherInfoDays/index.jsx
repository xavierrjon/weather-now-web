import "./index.scss";

function WeatherInfoDays({ weather5Days }) {
  if (!weather5Days?.list) return null;

  const dailyForecast = {};

  for (const forecast of weather5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString("pt-BR");

    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const next5Days = Object.values(dailyForecast).slice(1, 6);

  function capitalize(text) {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function formatDate(timestamp) {
    return capitalize(
      new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }

  return (
    <>
      <h2 className="weather-info-days-title">Próximos dias</h2>
      <div className="weather-info-5-days">
        {next5Days.map((forecast) => (
          <div key={forecast.dt} className="weather-info-5-days-item">
            <div className="forecast-top">
              <h3>{formatDate(forecast.dt)}</h3>

              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
              />
            </div>

            <div className="forecast-bottom">
              <p className="temperature">
                {Math.round(forecast.main.temp_min)}°C min /{" "}
                {Math.round(forecast.main.temp_max)}°C max
              </p>

              <p className="description">
                {capitalize(forecast.weather[0].description)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WeatherInfoDays;
