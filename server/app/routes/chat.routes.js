import { Router } from "express";
import {
  addAdminToGroup,
  addUserToGroup,
  clear,
  create,
  destroy,
  index,
  removeAdminFromGroup,
  removeUserFromGroup,
  show,
  update,
} from "../controllers/chat.controller.js";

import {
  addAdminToChatValidator,
  addUserToChatValidator,
  createChatValidator,
  deleteChatValidator,
  removeAdminFromChatValidator,
  removeUserFromChatValidator,
  showChatValidator,
  updateChatValidator,
} from "../utils/validation/chat.validator.js";

import {
  verifyDeleteChat,
  verifyManegeAdmins,
  verifyManegeUsers,
  verifyUpdateChat,
} from "../middlewares/chat.middleware.js";

import messageRouter from "./message.routes.js";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.use(verifyToken);
chatRouter.use(verifyEmail);

chatRouter.route("/").get(index).post(createChatValidator, create);

chatRouter
  .route("/:id")
  .get(showChatValidator, show)
  .put([...updateChatValidator, verifyUpdateChat], update)
  .delete([...deleteChatValidator, verifyDeleteChat], destroy);

chatRouter.post(
  "/:id/clear",
  [...deleteChatValidator, verifyDeleteChat],
  clear
);

chatRouter.put(
  "/:id/users/add",
  [...addUserToChatValidator, verifyManegeUsers],
  addUserToGroup
);

chatRouter.put(
  "/:id/users/remove",
  [...removeUserFromChatValidator, verifyManegeUsers],
  removeUserFromGroup
);

chatRouter.put(
  "/:id/admins/add",
  [...addAdminToChatValidator, verifyManegeAdmins],
  addAdminToGroup
);

chatRouter.put(
  "/:id/admins/remove",
  [...removeAdminFromChatValidator, verifyManegeAdmins],
  removeAdminFromGroup
);

chatRouter.use("/:id/messages", messageRouter);

export default chatRouter;
