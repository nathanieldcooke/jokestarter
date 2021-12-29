'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
var db = require('./../models');
module.exports = function (sequelize, dataTypes) {
    var SupportTier = sequelize.define('SupportTier', {
        projectId: DataTypes.INTEGER,
        name: DataTypes.STRING(50),
        summary: DataTypes.STRING(1000),
        estimatedDelivery: DataTypes.DATE,
        shipsTo: DataTypes.STRING(50),
        amountAvailable: DataTypes.INTEGER,
        minPledge: DataTypes.INTEGER
    }, {});
    SupportTier.associate = function (models) {
        SupportTier.belongsTo(models.Project, { foreignKey: 'projectId' });
        SupportTier.hasMany(models.UsersToSupportTier, { foreignKey: 'supportTierId' });
        var columnMapping1 = {
            through: 'UsersToSupportTier',
            otherKey: 'userId',
            foreignKey: 'supportTierId'
        };
        SupportTier.belongsToMany(models.User, columnMapping1);
    };
    return SupportTier;
};
