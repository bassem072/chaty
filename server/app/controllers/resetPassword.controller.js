import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import Token from "../models/token.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new ApiError("User not found for email: " + email, 404));
  }

  const tokenStr = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const tokenObj = new Token({
    user: user.id,
    methodType: "confirm-password",
    token: tokenStr,
  });

  const token = await tokenObj.save();

  const verificationLink = `http://localhost:3000/reset?id=${token.user}&token=${token.token}`;

  const isSent = sendEmail(user.email, verificationLink);

  if (!isSent) {
    await Token.findByIdAndDelete(token.id);

    return next(
      new ApiError("Can't send email to user, please try again.", 500)
    );
  }

  res.status(204);
});

export const verifyLink = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const userToken = await Token.findOne({ user: id, token });

  if (!userToken) {
    return next(new ApiError("Invalid token", 401));
  }

  res.status(204);
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { id, token } = req.params;

  const { password } = req.body;

  const userToken = await Token.findOne({ user: id, token });

  if (!userToken) {
    return next(new ApiError("Invalid token", 401));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  if (!user.verified) user.verified = true;

  user.password = password;

  await user.save();

  await userToken.deleteOne();

  res.status(204);
});
