import TemperatureRecipe from "../services/temperatureService.js";
import RecipeUser from "../services/recipeService.js";

const createTemperature = async (req, res) => {
    try {
        const userId = req.userId;
        const recipe_id = req.params.recipe_id;

        if(!recipe_id) return res.status(400).json({error:"ID receita não informado!"});

        const recipe = await RecipeUser.showOneRecipe(recipe_id);

        console.log(userId)

        console.log(recipe);

        if(!recipe) return res.status(400).json({error:"Receita não encontrada"});

        if(userId != recipe.user_id) return res.status(403).json({error:"Ação não permitida"});

        const {
            max_temperature_ramp, 
            min_temperature_ramp, 
            max_temperature_limit,
            min_temperature_limit,
            timer,
            initialization,
            ideal_time,
            active_temperature,
            } = req.body;

        const temperature = await TemperatureRecipe.createTemperature(
            max_temperature_ramp, 
            min_temperature_ramp, 
            max_temperature_limit,
            min_temperature_limit,
            timer,
            initialization,
            ideal_time,
            active_temperature,
            recipe_id);

        res.status(201).json({message:"Temperatura criado com sucesso", temperature});

    } catch (error) {
        console.error(error.message);

        res.status(500).json({error:"Erro interno do servidor"});
    }
}

const showTemperature =async (req, res) => {
    
}

export {createTemperature};