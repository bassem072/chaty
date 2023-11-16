import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validator.middleware.js";

export const forgetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Email is not valid"),

  validatorMiddleware,
];

export const verifyLinkValidator = [
  param("id")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user id format"),

  param("token").notEmpty().withMessage("token is required"),

  validatorMiddleware,
];

export const resetPasswordValidator = [
  param("id")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user id format"),

  param("token").notEmpty().withMessage("token is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];
