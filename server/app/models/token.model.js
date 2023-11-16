import { Schema, model } from "mongoose";

const schema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  methodType: {
    type: String,
    enum: ["verify-email", "confirm-password"],
  },
  createdAt: {
    type: Schema.Types.Date,
    default: new Date(),
    expires: 3600,
  },
});

const Token = model("Token", schema);

export default Token;
