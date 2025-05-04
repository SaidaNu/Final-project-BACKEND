import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Like",
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
