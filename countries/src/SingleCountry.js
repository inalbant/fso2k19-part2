import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=dc266786a8974f4eb72182906191907&q=${
          country.capital
        }`
      )
      .then(response => setWeather(response.data.current));
    //.then(response => console.log(response.data.current.temp_c));
  }, [country]);

  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt="flag"
        style={{ maxWidth: "200px", border: "1px solid" }}
      />
      <h3>Weather in {country.capital}</h3>
      {weather.temp_c && (
        <>
          <strong>Temperature: </strong>
          <span>{weather.temp_c} Celcius</span>
          <img
            src={weather.condition.icon}
            alt="condition"
            style={{ display: "block" }}
          />
          <strong>Wind: </strong>
          <span>
            {weather.wind_kph} kph, direction {weather.wind_dir}
          </span>
        </>
      )}
    </>
  );
};

export default SingleCountry;
