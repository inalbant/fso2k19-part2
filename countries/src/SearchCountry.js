import React from "react";

const SearchCountry = ({ searchTerm, handleSearch }) => (
  <>
    <label htmlFor="search">Find Countries: </label>
    <input type="text" id="search" value={searchTerm} onChange={handleSearch} />
  </>
);

export default SearchCountry;
