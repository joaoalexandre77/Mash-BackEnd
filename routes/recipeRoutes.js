import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createRecipe, deleteRecipe, showRecipe, updateRecipe } from "../controllers/recipeController.js";

const Router = express.Router();

Router.get("/receitas", authMiddleware, showRecipe);
Router.post("/receitas", authMiddleware, createRecipe);
Router.delete("/receitas/:recipeId", authMiddleware, deleteRecipe);
Router.put("/receitas/:recipeId", authMiddleware, updateRecipe);

export default Router;