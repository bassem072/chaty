import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validator.middleware.js";

export const sendMessageValidator = [
  body("messageType")
    .notEmpty()
    .withMessage("Message type must be specified")
    .isIn(["text", "photo", "video", "file", "record"]).withMessage("Message type is invalid"),
  body("content").custom((val, { req }) => {
    if (req.body.messageType === "text" && !req.body.content) {
      throw new Error("Content is required");
    }
  }),
  body("fileUrl").custom((val, { req }) => {
    const types = ["photo", "video", "file", "record"];
    if (types.includes(req.body.messageType) && !req.body.fileUrl) {
      throw new Error("File URL must be specified");
    }
  }),
  validatorMiddleware,
];

export const showMessageValidator = [
  param("chatId").isMongoId().withMessage("This is not a valid chat id format"),
  param("id").isMongoId().withMessage("This is not a valid message id format"),
  validatorMiddleware,
];

export const updateMessageValidator = [
  param("chatId").isMongoId().withMessage("This is not a valid chat id format"),
  param("id").isMongoId().withMessage("This is not a valid message id format"),
  body("content").notEmpty().withMessage("Content must be specified"),
  validatorMiddleware,
];

export const deleteMessageValidator = [
  param("chatId").isMongoId().withMessage("This is not a valid chat id format"),
  param("id").isMongoId().withMessage("This is not a valid message id format"),
  validatorMiddleware,
];