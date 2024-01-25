import axios from "axios";
import apiInstance from "../utils/apiInstance";

export const registerService = async (userData) => {
  const response = await apiInstance.post("register", userData);

  return response.data;
};

export const loginService = async (userData) => {
  const response = await apiInstance.post("login", userData);

  return response.data;
};

export const googleService = async () => {
  const response = await apiInstance.get("auth/google", {
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  return response.data;
};

export const facebookService = async () => {
  const response = await apiInstance.get("auth/facebook");

  return response.data;
};

export const verifyEmailService = async ({ id, token }) => {
  const response = await axios.get(
    "http://localhost:5000/api/verifyEmail?id=" + id + "&token=" + token
  );

  return response.data;
};

export const verifyPasswordService = async ({ email }) => {
  const response = await apiInstance.post("forgetPassword", {
    email,
  });

  return response.data;
};

export const verifyLinkService = async ({ id, token }) => {
  const response = await apiInstance.get(
    "verifyPasswordLink?id=" + id + "&token=" + token
  );

  return response.data;
};

export const resetPassword = async ({ id, token, password }) => {
  const response = await apiInstance.post(
    "verifyPasswordLink?id=" + id + "&token=" + token,
    { password }
  );

  return response.data;
};
