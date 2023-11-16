import { Router } from "express";
import { verifyRole, verifyToken } from "../../middlewares/auth.middleware.js";
import usersRouter from "./user.routes.js";
import chatRouter from "./chat.routes.js";

const dashboardRouter = Router();

dashboardRouter.use(verifyToken);
dashboardRouter.use(verifyRole(['admin']));

dashboardRouter.use('/users', usersRouter);
dashboardRouter.use('/chats', chatRouter);

export default dashboardRouter;
