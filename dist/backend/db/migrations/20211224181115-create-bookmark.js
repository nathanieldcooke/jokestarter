'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Bookmarks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            projectId: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('Bookmarks');
    }
};
