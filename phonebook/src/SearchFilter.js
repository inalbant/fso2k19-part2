import React from "react";

const SearchFilter = ({ searchTerm, handleSearch }) => (
  <>
    <label htmlFor="search">Search for a person: </label>
    <input id="search" type="text" value={searchTerm} onChange={handleSearch} />
  </>
);

export default SearchFilter;