import express from "express";
import swaggerUi from "swagger-ui-express"; 
import swaggerDocument from "../config/swagger.json" with { type: 'json' };
import { SwaggerTheme } from "swagger-themes";

const Router = express.Router();
const theme = new SwaggerTheme();

Router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss: theme.getBuffer('dark')}));

export default Router;