'use strict';
import { QueryInterface } from "sequelize/types";
const SequelizeType = require('sequelize');

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof SequelizeType) => {
    return queryInterface.createTable('UsersToSupportTiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      supportTierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pledgeAmount: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('UsersToSupportTiers');
  }
};