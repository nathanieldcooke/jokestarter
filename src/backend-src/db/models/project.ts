// 'use strict';
export {}
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const Project = sequelize.define('Project', {
    goal: dataTypes.INTEGER,
    endDate: dataTypes.DATE,
    title: dataTypes.STRING(50),
    summary: dataTypes.STRING(500),
    video: dataTypes.STRING(500),
    screenShot: dataTypes.STRING(500),
    creatorName: dataTypes.STRING(25),
    categoryId: dataTypes.INTEGER
  }, {});
  Project.associate = function(models:any) {
    // associations can be defined here
  };
  return Project;
};