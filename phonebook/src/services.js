import axios from "axios";
const baseURL = 'http://localhost:3001/persons/';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = newPerson => {
  const request = axios.post(baseURL, newPerson);
  return request.then(response => response.data);
};

const updateNumber = (id, newPerson) => {
  const request = axios.put(baseURL + id, newPerson);
  return request.then(response => response.data);
};

const deletePerson = id => {
  axios.delete(baseURL + id);
};

export default {
  getAll, create, deletePerson, updateNumber
};