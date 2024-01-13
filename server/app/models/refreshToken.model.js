import { Schema, model } from "mongoose";

const schema = new Schema({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: {
    type: Schema.Types.Date,
    default: Date.now(),
    expires: 2592000,
  }
});

const RefreshToken = model("RefreshToken", schema);

export default RefreshToken;
