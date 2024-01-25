import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { userResponse, usersResponse } from "../utils/dto/userResponseDTO.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";


export const index = asyncHandler(async (req, res) => {
  const limit = req.query.limit ?? 10;
  const skip = req.query.skip ?? 0;
  const keyword = req.query.keyword ?? "";

  const expectedUsers = [req.user.id];
  
  if (req.query.users && Array.isArray(req.query.users.split(","))) {
    expectedUsers.push(...req.query.users.split(","));
  }

  const users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
    _id: { $nin: expectedUsers },
  })
    .sort("-created")
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    data: usersResponse(users),
  });
});

export const show = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);

  if (!user) {
    return next(new ApiError("User not found for id: " + id, 404));
  }

  res.status(200).json({ data: userResponse(user) });
});

export const getProfileImage = async (req, res, next) => {
  const { id } = req.params;
  let user = await User.findById(id);

  
  if (!user) {
    return next(new ApiError("User not found for id: " + id, 404));
  }
  
  console.log(user.profileImage);
  if (user.profileImage === "default") {
    return next(new ApiError("No profile image here!"), 404);
  }
  
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  console.log(__dirname);
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "profileImages",
    user.profileImage
  );

  const r = fs.createReadStream(filePath);
  r.pipe(res);
};