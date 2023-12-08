import axios from "axios";
import { remove } from "../slices/auth";
import apiInstance from "./apiInstance";
import { getToken } from "./storage";

const apiSetup = (store, navigate) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["x-access-token"] = "Bearer " + token;
      }

      return config;
    },
    (err) => {
      Promise.reject(err);
    }
  );

  const { dispatch } = store;

  apiInstance.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalRequest = err.config;
      if (err.response && err.response.status === 401) {
        //alert(err.response.data.message);
        if (
          !originalRequest._retry &&
          err.response.data.message !==
            "Email not verified, please check your inbox or spam to verify your email"
        ) {
          originalRequest._retry = true;
          try {
            const response = await axios.get(
              "http://localhost:5000/api/refresh"
            );
            const { token } = response.data;

            localStorage.setItem("token", token);

            originalRequest.headers.Authorization = "Bearer " + token;
            return apiInstance(originalRequest);
          } catch (error) {
            dispatch(remove());
            navigate("/auth");
            return Promise.reject(error);
          }
        }
      }

      return Promise.reject(err);
    }
  );

  return apiInstance;
};

export default apiSetup;
