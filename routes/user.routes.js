import express from "express";
import UserController from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authUser, UserController.getMe);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
export default router;
