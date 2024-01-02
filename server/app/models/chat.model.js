import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({
  "users.name": "text",
  "users.email": "text",
  "name": "text",
});

const Chat = model("Chat", schema);

export default Chat;
