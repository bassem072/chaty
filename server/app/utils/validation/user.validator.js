import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validator.middleware.js";

export const getUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];

export const deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];
