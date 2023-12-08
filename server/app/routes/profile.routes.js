import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import { Router } from "express";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { updateUserValidator } from "../utils/validation/profile.validator.js";
import {
  destroy,
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
profileRouter.get("/logout", logout);

export default profileRouter;
