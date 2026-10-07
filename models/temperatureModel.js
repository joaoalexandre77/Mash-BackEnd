import { DataTypes } from "sequelize";
import Connection from "../config/sequelize-config.js";

const Temperature = Connection.define("Temperatures", {
    max_temperature_ramp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    min_temperature_ramp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_temperature_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    min_temperature_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timer: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    initialization: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    ideal_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    order_ramp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "receitas",
            key: "id",
        },
        onDelete: 'CASCADE'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: "Temperatures",
    timestamps: true
});

export default Temperature;