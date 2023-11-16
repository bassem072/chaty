import { v4 as uuid } from "uuid";
import RefreshToken from "../models/refreshToken.model.js";

const expireDate = (remember) => {
  const duration = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + duration);
  console.log(duration, expireDate);
  return expireDate;
};

export const createRefreshToken = async (payload, remember) => {
  const _token = uuid();
  const refreshToken = await RefreshToken.create({
    token: _token,
    user: payload,
    expiryDate: expireDate(remember),
    remember,
  });

  return refreshToken.token;
};

export const verifyExpirationRefreshToken = (expiryDate) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiryDate);
  return expirationDate.getTime() > currentDate.getTime();
};
