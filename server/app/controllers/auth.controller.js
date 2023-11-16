import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { createAccessToken } from "../utils/createAccessToken.js";
import {
  createRefreshToken,
  verifyExpirationRefreshToken,
} from "../utils/createRefreshToken.js";
import RefreshToken from "../models/refreshToken.model.js";
import { ApiError } from "../utils/apiError.js";
import { userResponse } from "../utils/dto/userResponseDTO.js";
import Token from "../models/token.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = asyncHandler(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    bio: req.body.bio,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
  });

  const accessToken = createAccessToken(user._id);
  const refreshToken = await createRefreshToken(user._id, false);

  const tokenStr = jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  const tokenObj = new Token({
    user: user.id,
    methodType: "verify-email",
    token: tokenStr,
  });

  const token = await tokenObj.save();

  const verificationLink = `http://localhost:3000/verify?id=${token.user}&token=${token.token}`;

  const isSent = sendEmail(req.user.email, verificationLink);

  if (!isSent) {
    await Token.findByIdAndDelete(token.id);

    return next(
      new ApiError("Can't send email to user, please try again.", 500)
    );
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    token: accessToken,
    data: userResponse(user),
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const remember = req.body.remember ?? false;

  if (!user) {
    return next(new ApiError("This email is not available for any user.", 404));
  }

  if (!user.password) {
    return next(new ApiError("You don't have password for this user.", 404));
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return next(new ApiError("Invalid password", 401));
  }

  const accessToken = createAccessToken(user._id);
  const refreshToken = await createRefreshToken(user._id, remember);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: false,
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token: accessToken,
    data: userResponse(user),
  });
});

export const socialLogin = asyncHandler(async (req, res) => {
  const accessToken = createAccessToken(req.user.id);
  const refreshToken = await createRefreshToken(req.user.id, true);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: false,
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token: accessToken,
    data: userResponse(req.user),
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const userToken = await Token.findOne({ user: id, token });

  if (!userToken) {
    return next(new ApiError("Invalid token", 401));
  }

  const user = await User.findByIdAndUpdate(
    id,
    { verified: true },
    { new: true }
  );

  await userToken.deleteOne();

  res.status(200).json({ data: user });
});

export const refresh = asyncHandler(async (req, res, next) => {
  const refreshTokenString = req.cookies.refreshToken;

  if (!refreshTokenString)
    return next(new ApiError("Refresh token not found", 401));
  console.log(refreshTokenString);

  const oldRefreshToken = await RefreshToken.findOne({
    token: refreshTokenString,
  });

  if (!oldRefreshToken) return next(new ApiError("Invalid refresh token", 403));

  const remember = oldRefreshToken.remember;

  if (!verifyExpirationRefreshToken(oldRefreshToken.expiryDate)) {
    await RefreshToken.deleteOne({ token: oldRefreshToken.token });
    return next(new ApiError("Refresh token expired", 403));
  }

  const accessToken = createAccessToken(oldRefreshToken.user);
  const refreshToken = await createRefreshToken(
    oldRefreshToken.user,
    oldRefreshToken.remember
  );
  await RefreshToken.deleteOne({ token: oldRefreshToken.token });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: false,
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token: accessToken,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const refreshTokenString = req.cookies.refreshToken;

  if (!refreshTokenString)
    return next(new ApiError("Refresh token not found", 401));

  await RefreshToken.deleteOne({
    token: refreshTokenString,
  });

  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
});
