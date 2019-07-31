import React from "react";

const Persons = ({ renderPersons }) => (
  <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
    {renderPersons()}
  </ul>
);

export default Persons;