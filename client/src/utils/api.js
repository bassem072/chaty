import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post("http://localhost:5000/api/refresh");
        const { token } = response.data;

        localStorage.setItem("token", token);

        originalRequest.headers.Authorization = "Bearer " + token;
        return axios(originalRequest);
      } catch (error) {
        // dispatch(logout());
        const navigate = useNavigate();
        navigate("/auth");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
