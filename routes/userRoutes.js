import express from "express";
import { createUser, showUser, deleteUser, updateUser, updateImage } from "../controllers/userController.js";
import login from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/user", createUser);

router.get("/user", authMiddleware, showUser);
router.delete("/user", authMiddleware, deleteUser);
router.put("/user", authMiddleware, updateUser);

router.put("/user/upload", authMiddleware, upload.single("imageUser"), updateImage);

export default router;