import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createTemperature } from "../controllers/temperatureController.js";
const router = express.Router();

router.post("/receitas/temperatura/:recipe_id", authMiddleware, createTemperature);

// router.get("/temperatura", authMiddleware, showUser);
// router.delete("/temperatura", authMiddleware, deleteUser);
// router.put("/temperatura", authMiddleware, updateUser);

export default router;