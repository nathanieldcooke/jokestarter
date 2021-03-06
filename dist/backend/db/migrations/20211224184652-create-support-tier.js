'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeType = require('sequelize');
module.exports = {
    up: function (queryInterface, Sequelize) {
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('SupportTiers');
    }
};
