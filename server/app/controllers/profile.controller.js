import asyncHandler from "express-async-handler";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { userResponse } from "../utils/dto/userResponseDTO.js";

export const show = asyncHandler(async (req, res, next) => {
  console.log("hi", req.cookies);
  res.status(200).json({ data: userResponse(req.user) });
});

export const update = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new ApiError("User not found for id: " + id, 404));
  }

  res.status(200).json({ data: userResponse(user) });
});

export const destroy = asyncHandler(async (req, res, next) => {
  await RefreshToken.deleteMany({ user: req.user.id });
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    return next(new ApiError("User not found for id: " + id, 404));
  }

  res.status(204).json();
});

export const uploadProfileImage = async (req, res, next) => {
  if (req.file) {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: req.file.filename },
      { new: true }
    );

    if (!user) {
      return next(new ApiError("User not found"), 404);
    }

    res.status(200).json({ data: userResponse(user) });
  } else {
    return next(new ApiError("profileImage is required"), 400);
  }
};

export const getProfileImage = async (req, res, next) => {
  if (req.user.profileImage === "default") {
    return next(new ApiError("No profile image here!"), 404);
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  console.log(__dirname);
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "profileImages",
    req.user.profileImage
  );

  const r = fs.createReadStream(filePath);
  r.pipe(res);
};

export const removeProfileImage = asyncHandler(async (req, res, next) => {
  if (req.user.profileImage === "default") {
    return next(new ApiError("No profile image here!"), 404);
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "profileImages",
    req.user.profileImage
  );

  if (fs.existsSync(filePath)) {
    console.log("x ", true);
    fs.unlinkSync(filePath);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profileImage: "default" },
    { new: true }
  );

  res.status(200).json({ data: user });
});

export const logout = asyncHandler(async (req, res, next) => {
  const refreshTokenString = req.cookies.refresh;

  if (!refreshTokenString) {
    return next(new ApiError("Refresh token not found", 401));
  }

  await RefreshToken.deleteOne({
    token: refreshTokenString,
  });

  res.clearCookie("refresh");

  res.status(200).json({ message: "Logged out successfully" });
});
