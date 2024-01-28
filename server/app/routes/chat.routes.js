import { Router } from "express";
import {
  addAdminToGroup,
  addUserToGroup,
  cancelJoinGroup,
  clear,
  create,
  destroy,
  fetch,
  getChatImage,
  index,
  joinGroup,
  leaveAdminGroup,
  leaveGroup,
  removeAdminFromGroup,
  removeUserFromGroup,
  show,
  update,
  uploadChatImage,
} from "../controllers/chat.controller.js";

import {
  addAdminToChatValidator,
  addUserToChatValidator,
  createChatValidator,
  deleteChatValidator,
  fetchChatValidator,
  removeAdminFromChatValidator,
  removeUserFromChatValidator,
  showChatValidator,
  updateChatValidator,
} from "../utils/validation/chat.validator.js";

import {
  verifyDeleteChat,
  verifyGetChat,
  verifyManegeAdmins,
  verifyManegeUsers,
  verifyUpdateChat,
} from "../middlewares/chat.middleware.js";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/uploadChatImage.middleware.js";

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

chatRouter.post(
  "/:id/changeChatPic",
  [
    verifyGetChat,
    upload.single("chatImage", (req, res, next) => {
      console.log(req.chat);
      next();
    }),
  ],
  uploadChatImage
);

chatRouter.get("/:id/chatImage", showChatValidator, getChatImage);

chatRouter.post("/fetch", [...fetchChatValidator], fetch);

chatRouter.post(
  "/:id/users/add",
  [...addUserToChatValidator, verifyManegeUsers],
  addUserToGroup
);

chatRouter.post(
  "/:id/users/remove",
  [...removeUserFromChatValidator, verifyManegeUsers],
  removeUserFromGroup
);

chatRouter.post(
  "/:id/admins/add",
  [...addAdminToChatValidator, verifyManegeAdmins],
  addAdminToGroup
);

chatRouter.post(
  "/:id/admins/remove",
  [...removeAdminFromChatValidator, verifyManegeAdmins],
  removeAdminFromGroup
);

chatRouter.post("/:id/join", joinGroup);

chatRouter.post("/:id/leave", leaveGroup);

chatRouter.post("/:id/cancelJoin", cancelJoinGroup);

chatRouter.post("/:id/leaveAdmin", leaveAdminGroup);

export default chatRouter;
