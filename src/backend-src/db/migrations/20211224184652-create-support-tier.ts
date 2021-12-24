'use strict';
module.exports = {
  up: (queryInterface:any, Sequelize:any) => {
    return queryInterface.createTable('SupportTiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      estimatedDelivery: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      shipsTo: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      amountAvailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minPledge: {
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
  down: (queryInterface:any, Sequelize:any) => {
    return queryInterface.dropTable('SupportTiers');
  }
};