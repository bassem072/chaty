import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const register = asyncHandler(async (req, res, next) => {
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

  const tokenStr = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const tokenObj = new Token({
    user: user.id,
    methodType: "verify-email",
    token: tokenStr,
  });

  const token = await tokenObj.save();

  const verificationLink = `http://localhost:3000/verify?id=${token.user}&token=${token.token}`;

  try {
    await sendEmail(user.email, verificationLink);
  } catch (err) {
    await Token.findByIdAndDelete(token.id);

    return next(
      new ApiError("Can't send email to user, please try again.", 500)
    );
  }

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    sameSite: false,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    token: accessToken,
    data: userResponse(user),
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const remember = req.body.remember ?? false;
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError("This email is not available for any user.", 404));
  }

  if (!user.password) {
    return next(new ApiError("You don't have password for this user.", 404));
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return next(new ApiError("Invalid password", 404));
  }

  const accessToken = createAccessToken(user._id);
  const refreshToken = await createRefreshToken(user._id, remember);

  console.log(refreshToken);

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    sameSite: false,
    secure: true,
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

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    sameSite: false,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token: accessToken,
    data: userResponse(req.user),
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { id, token } = req.query;

  const userToken = await Token.findOne({
    user: id,
    methodType: "verify-email",
  });

  console.log(id, token, userToken);

  if (!userToken) {
    return next(
      new ApiError(
        "We didn't found any verification Link for this user id, Please login and we will send another verification link.",
        401
      )
    );
  }

  if(userToken.token !== token) {
    return next(new ApiError("Invalid verification link for this user id, Please check your mail", 401));
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
  const refreshTokenString = req.cookies.refresh;

  console.log("from refresh token: " + refreshTokenString);

  console.log(refreshTokenString);

  if (!refreshTokenString) {
    return next(new ApiError("Refresh token not found", 401));
  }
  console.log(refreshTokenString);

  const oldRefreshToken = await RefreshToken.findOne({
    token: refreshTokenString,
  });

  if (!oldRefreshToken) {
    res.clearCookie("refresh");
    return next(new ApiError("Invalid refresh token", 403));
  }

  const remember = oldRefreshToken.remember;

  const user = await User.findById(oldRefreshToken.user);

  if (!user) {
    res.clearCookie("refresh");
    await RefreshToken.deleteOne({
      token: refreshTokenString,
    });
    return next(new ApiError("User not found", 404));
  }

  const accessToken = createAccessToken(oldRefreshToken.user);
  const refreshToken = await createRefreshToken(
    oldRefreshToken.user,
    oldRefreshToken.remember
  );
  await RefreshToken.deleteOne({ token: oldRefreshToken.token });

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token: accessToken,
    data: userResponse(user),
  });
});

export const failedLogin = asyncHandler((req, res, next) => {
  return next(new ApiError("Social Login Failed", 401));
});
