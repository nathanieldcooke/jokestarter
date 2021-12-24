'use strict';
// import { DataTypes, Sequelize } from "sequelize";
require('./type');
// require('sequelize');
// require("sequelize");
module.exports = function (sequelize, dataTypes) {
    var Project = sequelize.define('Project', {
        goal: DataTypes.INTEGER,
        endDate: DataTypes.DATE,
        title: DataTypes.STRING(50),
        summary: DataTypes.STRING(500),
        video: DataTypes.STRING(500),
        screenShot: DataTypes.STRING(500),
        creatorName: DataTypes.STRING(25),
        categoryId: DataTypes.INTEGER
    }, {});
    Project.associate = function (models) {
        // associations can be defined here
    };
    return Project;
};
