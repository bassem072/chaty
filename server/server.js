import express from "express";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import { rateLimit } from "express-rate-limit";
import url from "url";
import path from "path";
import "./app/utils/dotenv.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbSetup from "./app/utils/DBSetup.js";
import appRoutes from "./app/routes/index.js";
import { ApiError } from "./app/utils/apiError.js";
import { globalError } from "./app/middlewares/error.middleware.js";

dbSetup();

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  origin: true, //access-control-allow-origin:true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json({ limit: "20kb" }));

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

const SocketServer = http.createServer(app);
const io = new Server(SocketServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_user_room", (userId) => {
    console.log("From Socket Server", userId);
    socket.join(userId);
  });

  socket.on("send_message", (messageContent) => {
    console.log("Sent message", messageContent.message);
    if (messageContent.message.chatId.isGroupChat) {
      messageContent.message.chatId.users.forEach((user) => {
        console.log(user._id);
        io.to(user._id).emit("receive_message", messageContent);
      });
    } else {
      console.log(messageContent.message.chatId.user._id);
      io.to(messageContent.message.chatId.user._id).emit(
        "receive_message",
        messageContent.message
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/api/auth", limiter);
app.disable("etag");

appRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const server = SocketServer.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
