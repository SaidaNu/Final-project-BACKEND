import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Like",
    default: [],
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
