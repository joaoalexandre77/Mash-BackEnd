import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";
import Temperature from "../models/temperatureModel.js";

User.hasMany(Recipe, {
    foreignKey: "user_id"
});

Recipe.belongsTo(User, {
    foreignKey: "user_id"
});

Recipe.hasMany(Temperature, {
    foreignKey: "recipe_id"
});

Temperature.belongsTo(Recipe, {
    foreignKey: "recipe_id"
});