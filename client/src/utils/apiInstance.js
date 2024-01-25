import axios from "axios";

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export default apiInstance;