import axios from "axios";

const API = axios.create({
  baseURL: "https://last-mile-delivery-tracker-backened.onrender.com/api"
});

export default API;