import { Router } from "express";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { getProfileImage, index, show } from "../controllers/user.controller.js";
import { getUserValidator } from "../utils/validation/user.validator.js";

const userRouter = Router();

userRouter.use(verifyToken);
userRouter.use(verifyEmail);

userRouter.get("/", index);

userRouter.get("/:id", getUserValidator, show);
userRouter.get("/:id/profileImage", getUserValidator, getProfileImage);

export default userRouter;
