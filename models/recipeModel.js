import Sequelize from "sequelize";
import Connection from "../config/sequelize-config.js";

const Recipe = Connection.define("receitas", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'id'
        }
    }
});
Recipe.sync({force:false});

export default Recipe;