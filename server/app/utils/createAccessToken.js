import jwt from "jsonwebtoken";

export const createAccessToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
