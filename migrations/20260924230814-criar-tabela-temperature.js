'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Temperatures', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      max_temperature_ramp: {type: Sequelize.INTEGER,allowNull: false},
      min_temperature_ramp: {type: Sequelize.INTEGER, allowNull: false},
      max_temperature_limit: {type: Sequelize.INTEGER,allowNull: false,},
      min_temperature_limit: {type: Sequelize.INTEGER,allowNull: false},
      timer: {type: DataTypes.TIME,allowNull: false},
      initialization: {type: Sequelize.TIME,allowNull: false,},
      ideal_time: {type: Sequelize.TIME,allowNull: false},
      order_ramp: {type: Sequelize.INTEGER,allowNull: true},
      recipe_id: {type: Sequelize.INTEGER, allowNull: false,
        references: {
            model: "receitas",
            key: "id",
            },
            onDelete: 'CASCADE'
          },
      createdAt: {type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW')},
      updatedAt: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW')}
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
