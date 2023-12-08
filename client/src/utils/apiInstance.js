import axios from "axios";

const apiInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;