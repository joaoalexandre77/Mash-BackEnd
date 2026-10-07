import Temperature from "../models/temperatureModel.js";

class TemperatureRecipe {
    async createTemperature(
        max_temperature_ramp, 
        min_temperature_ramp, 
        max_temperature_limit, 
        min_temperature_limit, 
        timer, 
        initialization, 
        ideal_time, 
        active_temperature,
        recipe_id){
            const temperatue = Temperature.create({
                max_temperature_ramp, 
                min_temperature_ramp, 
                max_temperature_limit,
                min_temperature_limit,
                timer,
                initialization,
                ideal_time,
                active_temperature,
                recipe_id});
            return temperatue;
    }

    async showTemperature(idTemperature){

    }
}

export default new TemperatureRecipe;