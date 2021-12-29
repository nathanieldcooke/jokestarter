'use strict';
import { QueryInterface } from "sequelize/types";
const SequelizeType = require('sequelize');

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.createTable('Bookmarks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('Bookmarks');
  }
};