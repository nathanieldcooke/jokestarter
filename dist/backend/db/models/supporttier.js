'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
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
        // associations can be defined here
    };
    return SupportTier;
};
