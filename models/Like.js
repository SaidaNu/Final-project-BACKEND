import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: [true],
  },
  post: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  comment: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
});

export const Like = mongoose.model("like", likeSchema);
