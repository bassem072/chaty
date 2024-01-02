import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { userResponse, usersResponse } from "../utils/dto/userResponseDTO.js";

export const index = asyncHandler(async (req, res) => {
  const limit = req.query.limit ?? 10;
  const skip = req.query.skip ?? 0;
  const keyword = req.query.keyword ?? "";

  const users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
    _id: { $not: { $in: [req.user.id] } },
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
