import { Router } from "express";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { updateUserValidator } from "../utils/validation/profile.validator.js";
import {
  destroy,
  getProfileImage,
  logout,
  removeProfileImage,
  show,
  update,
  uploadProfileImage,
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/uploadProfileImage.middleware.js";

const profileRouter = Router();

profileRouter.use(verifyToken);
profileRouter.use(verifyEmail);

profileRouter
  .route("/")
  .get(show)
  .put(updateUserValidator, update)
  .delete(destroy);

profileRouter.post(
  "/changeProfilePic",
  upload.single("profileImage"),
  uploadProfileImage
);
profileRouter.post("/removeProfileImage", removeProfileImage);
profileRouter.get("/profileImage", getProfileImage);
profileRouter.delete("/logout", logout);

export default profileRouter;
