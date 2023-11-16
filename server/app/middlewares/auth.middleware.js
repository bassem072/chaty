import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import { createAccessToken } from "../utils/createAccessToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.headers["x-access-token"]) {
    return next(new ApiError("Not authorized", 401));
  }

  if (!req.headers["x-access-token"].startsWith("Bearer")) {
    return next(new ApiError("Invalid access token", 401));
  }

  const token = req.headers["x-access-token"].split(" ")[1];

  if (!token) return next(new ApiError("Invalid access token", 401));

  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decode.userId);

  if (!user) return next(new ApiError("No user for this api token", 401));

  req.user = user;

  next();
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  if (!req.user.verified) {
    let token = await Token.findOne({
      user: req.user.id,
      methodType: "verify-email",
    });

    if (!token) {
      const tokenStr = jwt.sign(
        { userId: req.user.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const tokenObj = new Token({
        user: req.user.id,
        methodType: "verify-email",
        token: tokenStr,
      });

      token = await tokenObj.save();

      const verificationLink = `http://localhost:3000/verify?id=${token.user}&token=${token.token}`;

      const isSent = sendEmail(req.user.email, verificationLink);

      if (!isSent) {
        await Token.findByIdAndDelete(token.id);

        return next(
          new ApiError("Can't send email to user, please try again.", 500)
        );
      }
    }

    return next(
      new ApiError(
        "Email not verified, please check your inbox or spam to verify your email"
      ),
      401
    );
  }

  next();
});

export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to access this url", 403)
      );
    }

    next();
  };
};
