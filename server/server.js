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
import passport from "passport";
import cookieSession from "cookie-session";

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

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

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

// Helper function to broadcast messages to users
const broadcastMessage = (socket, messageContent, event) => {
  // Determine the users to broadcast the message to
  const users = messageContent.chatId.isGroupChat
    ? messageContent.chatId.users.map((user) => user._id)
    : [messageContent.chatId.user._id, messageContent.sender.id];

  // Broadcast the message to each user
  users.forEach((userId) => {
    socket.broadcast.to(userId).emit(event, messageContent);
  });
};

// Helper function to broadcast chats to users
const broadcastNewChat = (socket, chatContent, event) => {
  console.log(chatContent);
  // Determine the users to broadcast the chat to
  const users = chatContent.isGroupChat
    ? chatContent.users.map((user) => user._id)
    : [chatContent.user._id, chatContent.latestMessage.sender];

  console.log(users);

  // Broadcast the chat to each user
  users.forEach((userId) => {
    socket.broadcast.to(userId).emit(event, chatContent);
  });
};

const broadcastGroupAction = (socket, chatContent, event) => {
  // Determine the users to broadcast the action to
  const users = chatContent.users.map((user) => user._id);

  // Broadcast the action to each user
  users.forEach((userId) => {
    socket.broadcast.to(userId).emit(event, chatContent);
  });
};

const broadcastTypingMessage = (socket, chatContent, userId, event) => {
  // Determine the users to broadcast the action to
  const users = chatContent.isGroupChat
    ? chatContent.users.map((user) => user._id)
    : [chatContent.user._id, userId];

  // Broadcast the action to each user
  users.forEach((userId) => {
    socket.broadcast.to(userId).emit(event, chatContent, userId);
  });
};

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("user_connected", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("online_users", Object.keys(onlineUsers));
  });

  // Handle a new user connection
  socket.on("join_user_room", (userId) => {
    // Join the user to their room
    socket.join(userId);
  });

  // Handle a user sending a message
  socket.on("send_message", (messageContent) => {
    // Broadcast the message to the appropriate users
    broadcastMessage(socket, messageContent, "receive_message");
  });

  // Handle a user creating a chat
  socket.on("create_chat", (chatContent) => {
    // Broadcast the chat to the appropriate users
    broadcastNewChat(socket, chatContent, "new_chat");
  });

  // Handle a user added group
  socket.on("new_user", (chatContent) => {
    // Broadcast the user added action to the appropriate users
    broadcastGroupAction(socket, chatContent, "add_user");
  });

  // Handle a user added group
  socket.on("removed_user", (chatContent) => {
    // Broadcast the user added action to the appropriate users
    broadcastGroupAction(socket, chatContent, "remove_user");
  });
  // Handle a user added group
  socket.on("new_admin", (chatContent) => {
    // Broadcast the user added action to the appropriate users
    broadcastGroupAction(socket, chatContent, "add_admin");
  });

  // Handle a user added group
  socket.on("removed_admin", (chatContent) => {
    // Broadcast the user added action to the appropriate users
    broadcastGroupAction(socket, chatContent, "remove_admin");
  });

  // Handle a user added group
  socket.on("start_typing", (chatContent, userId) => {
    // Broadcast the user added action to the appropriate users
    broadcastTypingMessage(socket, chatContent, userId, "start_type");
  });

  // Handle a user added group
  socket.on("stop_typing", (chatContent, userId) => {
    // Broadcast the user added action to the appropriate users
    broadcastTypingMessage(socket, chatContent, userId, "stop_type");
  });

  // Handle a user disconnecting
  socket.on("disconnect", () => {
    for (let username in onlineUsers) {
      if (onlineUsers[username] === socket.id) {
        delete onlineUsers[username];
        break;
      }
    }
    io.emit("online_users", Object.keys(onlineUsers));
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
  console.error(
    `UnhandledRejection Errors: ${err.name} | ${err.message} | ${err.stack}`
  );
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
