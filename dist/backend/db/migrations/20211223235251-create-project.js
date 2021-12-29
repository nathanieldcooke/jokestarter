'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeType = require('sequelize');
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            goal: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false,
            },
            summary: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            video: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false,
            },
            screenShot: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false,
            },
            creatorName: {
                type: Sequelize.STRING(25),
                allowNull: false,
            },
            categoryId: {
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
        return queryInterface.dropTable('Projects');
    }
};
