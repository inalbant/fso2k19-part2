import React, { useState, useEffect } from "react";
import services from "./services";
import SearchFilter from "./SearchFilter";
import NewPersonForm from "./NewPersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);
  const [notifMsg, setNotifMsg] = useState({
    message: null,
    positive: false
  });

  useEffect(() => {
    services
      .getAll()
      .then(initialList => setPersons(initialList))
  }, []);

  const renderPersons = () =>
    personsToShow.map(person => (
      <li key={person.name}>
        {`${person.name} ${person.number}`}
        <button style={{ marginLeft: '10px' }} onClick={() => handleDelete(person)}
        >
          Delete
        </button>
      </li>
    ));

  const personsToShow = !showFiltered
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setShowFiltered(true);
  };

  const handleDelete = person => {
    if (window.confirm(`Are you sure you want to DELETE ${person.name}?`)) {
      services
        .deletePerson(person.id);
      setPersons(persons.filter(p => p.id !== person.id));
      setNotifMsg({
        message: `${person.name} has been deleted from the phone book.`,
        positive: false
      });
      setTimeout(() => {
        setNotifMsg({ message: null });
      }, 2000);
    }
  };

  const addPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const person = persons.find(p => p.name === newName);
    if (person) {
      if (window.confirm(`
        ${newName} is already in the phone book, replace the old number with ${newNumber}?
      `)) {
        services
          .updateNumber(person.id, newPerson)
          .then(returnedPerson => setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson)))
          .then(setNotifMsg({
            message: `${newName}'s number has been updated.`,
            positive: true
          }))
          .then(setTimeout(() => {
            setNotifMsg({ message: null });
          }, 3000))
          .catch(error => {
            setNotifMsg({
              message: `${newName} was already deleted from the server.` + error,
              positive: false
            });
          })
        // .then(setTimeout(() => {
        //   setNotifMsg({ message: null });
        // }, 2000))
        // setNotifMsg({
        //   message: `${newName}'s number has been updated.`,
        //   positive: true
        // });
        // .then(console.log("timer started"))
        // .then(setTimeout(() => {
        //   setNotifMsg({ message: null });
        // }, 4000));


      }
    } else {
      services
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(setNotifMsg({
          message: `${newName} is added.`,
          positive: true
        }))
        .then(setTimeout(() => {
          setNotifMsg({ message: null });
        }, 2000));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2>Phonebook</h2>

      <Notification message={notifMsg.message} positive={notifMsg.positive} />

      <SearchFilter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>Add New Person</h3>

      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons renderPersons={renderPersons} />
    </>
  );
};

export default App;