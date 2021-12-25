'use strict';
export {}
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const SupportTier = sequelize.define('SupportTier', {
    projectId: DataTypes.INTEGER,
    name: DataTypes.STRING(50),
    summary: DataTypes.STRING(1000),
    estimatedDelivery: DataTypes.DATE,
    shipsTo: DataTypes.STRING(50),
    amountAvailable: DataTypes.INTEGER,
    minPledge: DataTypes.INTEGER
  }, {});
  SupportTier.associate = function(models:any) {
    SupportTier.belongsTo(models.Project, { foreignKey: 'projectId' });
    SupportTier.hasMany(models.UsersToSupportTier, { foreignKey: 'supportTierId' });

    const columnMapping1 = {
      through: 'UsersToSupportTier',
      otherKey: 'userId',
      foreignKey: 'supportTierId'
     };
     SupportTier.belongsToMany(models.User, columnMapping1);
  };
  return SupportTier;
};