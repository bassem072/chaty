import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { ApiError } from "../utils/apiError.js";
import { userResponse, usersResponse } from "../utils/dto/userResponseDTO.js";

export const index = asyncHandler(async (req, res) => {
  const docsCount = await User.countDocuments();
  const apiFeatures = new ApiFeatures(User.find(), req.query)
    .paginate(docsCount)
    .filter()
    .search(["name", "email"])
    .limitFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const users = await mongooseQuery;

  res.status(200).json({
    results: users.length,
    paginationResult,
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