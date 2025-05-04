import express from "express";
import PostController from "../controllers/post.controller.js";
import { authUser, checkIsAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authUser, checkIsAdmin, PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", authUser, checkIsAdmin, PostController.deletePost);

export default router;
