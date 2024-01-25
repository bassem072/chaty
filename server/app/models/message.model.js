import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    messageType: {
      type: String,
      enum: [
        "text",
        "photo",
        "video",
        "file",
        "record",
        "create_chat",
        "create_group",
        "add_admin_to_group",
        "remove_admin_from_group",
        "add_user_to_group",
        "remove_user_from_group",
        "leave",
        "join",
        "change_chat_pic",
      ],
      default: "text",
    },
    fileUrl: {
      type: String,
    },
    seen: [
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

schema.index({ content: "text" });

const Message = model("Message", schema);

export default Message;
