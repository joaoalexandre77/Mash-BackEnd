import Recipe from "../models/recipeModel.js";

class RecipeUser{
    
    async createRecipe(nameRecipe, idUser) {
        const recipe = await Recipe.create({nome: nameRecipe, user_id: idUser});
        return recipe;
    }

    async showRecipes(idUser) {
        const recipeList = await Recipe.findAll({
            where: {user_id: idUser}
        })
        return recipeList;
    }

    async showOneRecipe(recipeId) {
        const recipe = await Recipe.findByPk(recipeId);
        return recipe;
    }

    async deleteRecipe(recipeId) {
        const destroy = await Recipe.destroy({
            where:{id: recipeId}
        });

        if(destroy === 0) throw new Error("ID_NOT_EXISTING");
    }

    async updateUser(recipeId, nameRecipe) {
        const update = await Recipe.update({nome: nameRecipe}, {where: {id: recipeId}})
    }
}

export default new RecipeUser;