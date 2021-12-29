'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
var db = require('./../models');
module.exports = function (sequelize, dataTypes) {
    var UsersToSupportTier = sequelize.define('UsersToSupportTier', {
        userId: DataTypes.INTEGER,
        supportTierId: DataTypes.INTEGER,
        pledgeAmount: DataTypes.INTEGER
    }, {});
    UsersToSupportTier.associate = function (models) {
        UsersToSupportTier.belongsTo(models.SupportTier, { foreignKey: 'supportTierId' });
    };
    return UsersToSupportTier;
};
