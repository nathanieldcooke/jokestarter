'use strict';
export {}
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
const db = require('./../models')

module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const HideList = sequelize.define('HideList', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  HideList.associate = function(models: typeof db) {
    // associations can be defined here
  };
  return HideList;
};