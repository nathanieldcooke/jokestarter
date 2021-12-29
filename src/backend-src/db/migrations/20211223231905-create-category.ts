'use strict';
import { QueryInterface } from "sequelize/types";
const SequelizeType = require('sequelize');

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(25),
        unique: true,
        allowNull: false,
      },
      loggedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.dropTable('Categories');
  }
};