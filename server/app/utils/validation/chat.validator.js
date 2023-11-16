import { Types } from "mongoose";
import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validator.middleware";
import User from "../../models/user.model";

export const createChatValidator = [
  body("users")
    .notEmpty()
    .withMessage("The chat type is required")
    .custom(async (val, { req }) => {
      if (req.body.isGroupChat) {
        if (!Array.isArray(val)) {
          throw new Error("Users must be array");
        } else {
          let users = [req.user.id, ...val];

          users = users.filter(
            (user) =>
              Types.ObjectId.isValid(user) && user === users.indexOf(user)
          );
          let isValid = true;

          for (let user in users) {
            user = await User.findById(user);

            if (!user) {
              isValid = false;
              break;
            }
          }

          if (!isValid) {
            throw new Error("Some users not found");
          } else {
            if (users.length < 3) {
              throw new Error("Chat must have at least three users");
            } else {
              req.chat = {};
              req.chat.users = users;
              req.chat.groupAdmins = [req.user.id];
              req.chat.isGroupChat = true;
            }
          }
        }
      } else {
        if (Array.isArray(req.body.users)) {
          req.body.users = req.body.users[0];
        }
        if (Types.ObjectId.isValid(req.body.users)) {
          if (req.body.users === req.user.id) {
            throw new Error("You can't add yourself twice");
          } else {
            const user = await User.findById(user);

            if (!user) {
              throw new Error("This user is not found");
            } else {
              req.chat = {};
              req.chat.users = [req.user.id, req.body.users];
            }
          }
        } else {
          throw new Error("This is not a valid user id format");
        }
      }
    }),

  body("name").custom((val, { req }) => {
    if (req.body.isGroupChat) {
      if (!req.body.name) {
        throw new Error("Chat must have at least three users");
      } else {
        if (req.chat) {
          req.chat.name = val;
        }

        return true;
      }
    }
  }),

  validatorMiddleware,
];

export const showChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];

export const fetchChatValidator = [
  body("user").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];

export const updateChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  validatorMiddleware,
];

export const deleteChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  validatorMiddleware,
];

export const addUserToChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  body("user").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];

export const removeUserFromChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  body("user").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];

export const addAdminToChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  body("user").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];

export const removeAdminFromChatValidator = [
  param("id").isMongoId().withMessage("This is not a valid chat id format"),
  body("user").isMongoId().withMessage("This is not a valid user id format"),
  validatorMiddleware,
];