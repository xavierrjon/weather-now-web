import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.scss";
import WeatherInfo from "./components/WeatherInfo";
import WeatherInfoDays from "./components/WeatherInfoDays";
import { ArrowRight, Search } from "lucide-react";

const isDaytimeByDeviceClock = () => {
  const currentHour = new Date().getHours();

  return currentHour >= 6 && currentHour < 18;
};

function App() {
  const [weather, setWeather] = useState({});
  const [weather5Days, setWeather5Days] = useState({});
  const [isDaytime, setIsDaytime] = useState(() => isDaytimeByDeviceClock());

  const inputRef = useRef();

  useEffect(() => {
    const updateTheme = () => {
      setIsDaytime(isDaytimeByDeviceClock());
    };

    updateTheme();

    const intervalId = window.setInterval(updateTheme, 60 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const searchCity = async () => {
    const city = inputRef.current.value;

    const apiKey = import.meta.env.VITE_API_KEY;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    const apiInfo = await axios.get(apiUrl);

    const apiInfoDays = await axios.get(url5Days);

    setWeather(apiInfo.data);
    setWeather5Days(apiInfoDays.data);
  };

  return (
    <main className={`app ${isDaytime ? "app--day" : "app--night"}`}>
      <h1 className="app-title">
        Weather<span>Now</span>
      </h1>

      <div className="app-search">
        <Search className="search-icon" size={22} />

        <input
          className="app-input"
          ref={inputRef}
          type="text"
          placeholder="Digite uma cidade"
        />

        <button
          className="app-button"
          onClick={searchCity}
          aria-label="Buscar cidade"
        >
          <ArrowRight size={22} strokeWidth={2.3} />
        </button>
      </div>

      {weather && weather.weather && weather.main && (
        <div className="weather-container">
          <WeatherInfo weather={weather} />

          {weather5Days && weather5Days.list && (
            <WeatherInfoDays weather5Days={weather5Days} />
          )}
        </div>
      )}
    </main>
  );
}

export default App;
