import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchCountry from "./SearchCountry";
import ShowCountries from "./ShowCountries";
import SingleCountry from "./SingleCountry";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [btnClick, setBtnClick] = useState();

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setAllCountriesList(response.data));
  }, []);

  const renderCountries = () =>
    countriesToShow.map(country => (
      <li key={country.name} style={{ margin: "5px" }}>
        {country.name}
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => showClick(country)}
        >
          show
        </button>
      </li>
    ));

  const countriesToShow = !showFiltered
    ? []
    : allCountriesList.filter(country =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
      );

  const handleSearch = event => {
    setSearchCountry(event.target.value);
    setShowFiltered(true);
  };

  const showClick = country => {
    setBtnClick(country);
  };

  if (countriesToShow.length === 1) {
    return (
      <>
        <SearchCountry searchTerm={searchCountry} handleSearch={handleSearch} />
        <SingleCountry country={countriesToShow[0]} />
      </>
    );
  } else if (countriesToShow.length > 10) {
    return (
      <>
        <SearchCountry searchTerm={searchCountry} handleSearch={handleSearch} />
        <p>Too many matches, specify another filter.</p>
      </>
    );
  } else {
    return (
      <>
        <SearchCountry searchTerm={searchCountry} handleSearch={handleSearch} />
        <ShowCountries renderCountries={renderCountries} />
        {btnClick && <SingleCountry country={btnClick} />}
      </>
    );
  }
};

export default App;
