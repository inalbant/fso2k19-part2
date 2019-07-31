import React from "react";

const NewPersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
    <form onSubmit={addPerson}>
      <div>
        <label htmlFor="name">name: </label>
        <input
          id="name"
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="number">number: </label>
        <input
          id="number"
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );

export default NewPersonForm;
