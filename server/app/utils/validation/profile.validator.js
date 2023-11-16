import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validator.middleware.js";

export const updateUserValidator = [
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

  validatorMiddleware,
];