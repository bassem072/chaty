import { Router } from "express";
import { verifyEmail, verifyToken } from "../middlewares/auth.middleware.js";
import { index, show } from "../controllers/user.controller.js";
import { getUserValidator } from "../utils/validation/user.validator.js";

const userRouter = Router();

userRouter.use(verifyToken);
userRouter.use(verifyEmail);

userRouter.get("/", index);

userRouter.get("/:id", getUserValidator, show);

export default userRouter;
