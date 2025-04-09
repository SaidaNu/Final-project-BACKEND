import express from "express";
import LikeController from "../controllers/like.controller.js";

const router = express.Router();

router.post("/", LikeController.createLike);
router.get("/", LikeController.getAllLikes);
router.get("/:id", LikeController.getLikeById);
router.patch("/:id", LikeController.updateLike);
router.delete("/:id", LikeController.deleteLike);

export default router;
