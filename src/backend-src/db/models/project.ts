// 'use strict';
export {}

const db = require('./../models')
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
  Project.associate = function(models:typeof db) {
    Project.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Project.hasMany(models.SupportTier, { foreignKey: 'projectId' });

    const columnMapping1 = {
      through: 'HideList',
      otherKey: 'userId',
      foreignKey: 'projectId'
     }
     Project.belongsToMany(models.User, columnMapping1);

     const columnMapping2 = {
      through: 'Bookmark',
      otherKey: 'userId',
      foreignKey: 'projectId'
     }
     Project.belongsToMany(models.User, columnMapping2);
  };

  Project.getProjectId = async function (title:string) {
    const project = await Project.findOne({
      where: {
        title
      }
    })
    return project.id
  }
  return Project;
};