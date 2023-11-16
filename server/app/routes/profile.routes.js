import express from "express";
import { Router } from "express";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { updateUserValidator } from "../utils/validation/profile.validator.js";
import {
  destroy,
  removeProfileImage,
  show,
  update,
  uploadProfileImage,
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/uploadProfileImage.middleware.js";

const profileRouter = Router();

profileRouter.use(verifyToken);
profileRouter.use(verifyEmail);

profileRouter.use(
  "/image",
  express.static(path.join(__dirname, "/uploads/profileImages"))
);

profileRouter
  .route("/")
  .get(show)
  .put(updateUserValidator, update)
  .delete(destroy);

profileRouter.post("/changeProfileImage", upload, uploadProfileImage);
profileRouter.post("/removeProfileImage", removeProfileImage);

export default profileRouter;
