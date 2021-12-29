'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeType = require('sequelize');
module.exports = {
    up: function (queryInterface, Sequelize) {
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
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Categories');
    }
};
