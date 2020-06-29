import axios from "axios";

// this creates an instance of axios
// we do this so we can have a base url for the api
const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
