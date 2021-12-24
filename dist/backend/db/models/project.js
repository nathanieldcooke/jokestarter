"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
module.exports = function (sequelize, dataTypes) {
    var Project = sequelize.define('Project', {
        goal: dataTypes.INTEGER,
        endDate: dataTypes.DATE,
        title: dataTypes.STRING(50),
        summary: dataTypes.STRING(500),
        video: dataTypes.STRING(500),
        screenShot: dataTypes.STRING(500),
        creatorName: dataTypes.STRING(25),
        categoryId: dataTypes.INTEGER
    }, {});
    Project.associate = function (models) {
        // associations can be defined here
    };
    return Project;
};
