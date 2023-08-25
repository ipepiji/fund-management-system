import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:9000/api",
});

export default service;
