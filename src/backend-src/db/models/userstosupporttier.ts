'use strict';
export {}

const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
const db = require('./../models')

module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const UsersToSupportTier = sequelize.define('UsersToSupportTier', {
    userId: DataTypes.INTEGER,
    supportTierId: DataTypes.INTEGER,
    pledgeAmount: DataTypes.INTEGER
  }, {});
  UsersToSupportTier.associate = function(models: typeof db) {
    UsersToSupportTier.belongsTo(models.SupportTier, { foreignKey: 'supportTierId' });
  };
  return UsersToSupportTier;
};