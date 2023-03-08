import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [hasResult, showResult] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    let key = "3a94f3778290bfeee61278505dbbe51d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(ShowTemperature);
  }

  function updateCity(e) {
    setCity(e.target.value);
  }

  function ShowTemperature(response) {
    showResult(true);
    setWeatherInfo({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
        />
      <button type="Submit">Search</button>
      <h4><a href="http://github.com/prsmahajan/react-app-homework">Link to GitHub</a></h4>
    </form>
  );

  if (hasResult) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weatherInfo.temperature)}°C</li>
          <li>Description: {weatherInfo.description}</li>
          <li>Humidity: {weatherInfo.humidity}%</li>
          <li>Wind: {weatherInfo.wind}km/h</li>
          <li>
            <img src={weatherInfo.icon} alt={weatherInfo.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
