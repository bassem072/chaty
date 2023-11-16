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

const messageRouter = Router();

messageRouter.use(verifyChat);

messageRouter.route("/").get(index).post(sendMessageValidator, send);

messageRouter
  .route("/:id")
  .get(showMessageValidator, show)
  .put(updateMessageValidator, update)
  .delete(deleteMessageValidator, destroy);

export default messageRouter;
