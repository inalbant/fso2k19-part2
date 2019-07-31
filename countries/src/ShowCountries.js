import React from "react";

const ShowCountries = ({ renderCountries }) => (
  <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
    {renderCountries()}
  </ul>
);

export default ShowCountries;
