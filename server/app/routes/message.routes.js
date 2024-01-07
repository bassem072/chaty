import { Router } from "express";
import {
  destroy,
  index,
  send,
  show,
  update,
} from "../controllers/message.controller.js";
import {
  deleteMessageValidator,
  sendMessageValidator,
  showMessageValidator,
  updateMessageValidator,
} from "../utils/validation/message.validator.js";
import { verifyChat } from "../middlewares/message.middleware.js";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.use(verifyToken);
messageRouter.use(verifyEmail);

messageRouter
  .route("/:chatId/messages")
  .get([verifyChat], index)
  .post([verifyChat], sendMessageValidator, send);

messageRouter
  .route("/:chatId/messages/:id")
  .get([...showMessageValidator, verifyChat], show)
  .put([...updateMessageValidator, verifyChat], update)
  .delete([...deleteMessageValidator, verifyChat], destroy);

export default messageRouter;
