import authRouter from "./auth.routes.js";
import chatRouter from "./chat.routes.js";
import dashboardRouter from "./dashboard/index.js";
import messageRouter from "./message.routes.js";
import profileRouter from "./profile.routes.js";
import userRouter from "./user.routes.js";

export default function (app) {
    app.use('/api', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/dashboard', dashboardRouter);
    app.use('/api/profile', profileRouter);
    app.use('/api/chats', chatRouter);
    app.use('/api/chats', messageRouter);
}