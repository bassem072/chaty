import { body, param } from "express-validator";
import { validatorMiddleware } from "../../../middlewares/validator.middleware.js";
import User from "../../../models/user.model.js";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .custom((val, { req }) => {
      req.body.name = slugify(val);
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });

      if (user) {
        throw new Error("Email is already in use");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("bio")
    .notEmpty()
    .withMessage("Bio is required")
    .isLength({ min: 6 })
    .withMessage("Bio must be at least 6 characters")
    .custom((val, { req }) => {
      req.body.bio = slugify(val);
      return true;
    }),

  body("birthdate")
    .notEmpty()
    .withMessage("Birthdate is required")
    .custom((val) => {
      const startDate = new Date("1923-01-01");
      const endDate = new Date();
      const date = new Date(val);
      console.log(date);
      if (date < startDate || date > endDate) {
        return Promise.reject(new Error("Not invalid date"));
      }
      return true;
    }),

  body("gender")
    .notEmpty()
    .withMessage("Please select a gender")
    .isIn(["male", "female"])
    .withMessage("Please select male or female"),

  body("profileImage").optional(),

  body("role").isIn(["admin", "user"]),

  validatorMiddleware,
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .custom((val, { req }) => {
      req.body.name = slugify(val);
      return true;
    }),

  body("bio")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Bio must be at least 6 characters")
    .custom((val, { req }) => {
      req.body.bio = slugify(val);
      return true;
    }),

  body("birthdate")
    .optional()
    .custom((val) => {
      const startDate = new Date("1923-01-01");
      const endDate = new Date();
      const date = new Date(val);
      console.log(date);
      if (date < startDate || date > endDate) {
        return Promise.reject(new Error("Not invalid date"));
      }
      return true;
    }),

  body("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Please select male or female"),

  body("profileImage").optional(),

  body("role").optional().isIn(["admin", "user"]),

  validatorMiddleware,
];

export const getUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];

export const deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id format"),

  validatorMiddleware,
];