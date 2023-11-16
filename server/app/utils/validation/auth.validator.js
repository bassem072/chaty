import { body, param } from "express-validator";
import slugify from "slugify";
import User from "../../models/user.model.js";
import { validatorMiddleware } from "../../middlewares/validator.middleware.js";

export const signUpValidator = [
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

  validatorMiddleware,
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  validatorMiddleware,
];

export const verifyValidator = [
  param("id")
    .notEmpty()
    .withMessage("User is required")
    .isMongoId()
    .withMessage("Invalid user id format"),

  param("token")
    .notEmpty()
    .withMessage("Token is required"),

  validatorMiddleware,
];
