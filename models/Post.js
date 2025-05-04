import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    trim: true,
  },
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Like",
    default: [],
  },
});

export const Post = mongoose.model("Post", postSchema);
