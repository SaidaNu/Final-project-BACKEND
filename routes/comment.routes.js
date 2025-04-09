import express from "express";
import CommentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", CommentController.createComment);
router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.patch("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);

export default router;
