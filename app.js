import express from "express";
import "dotenv/config";
import { authDB, createDataBase } from "./config/data-base.js";
import RouterUser from "./routes/userRoutes.js";
import RouterRecipe from "./routes/recipeRoutes.js";
import RouterTemperature from "./routes/temperatureRoutes.js";
import RouterSwagger from "./routes/swaggerRoutes.js";
import Connection from "./config/sequelize-config.js";
import "./config/associations.js";

const app = express();
app.use(express.json());

app.use(RouterUser);
app.use(RouterRecipe);
app.use(RouterSwagger);
app.use(RouterTemperature)

authDB();
createDataBase();

await Connection.sync();

const port = 8080;
app.listen(port,(e) => {
    if(e) console.error("Ocorreu um erro ao iniciar o servidor");
    console.log(`Servidor iniciado http://localhost:${port}`);
    console.log(`Documentação Swagger em http://localhost:${port}/api-docs`)
});