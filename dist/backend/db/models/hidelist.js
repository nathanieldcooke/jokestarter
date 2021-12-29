'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
var db = require('./../models');
module.exports = function (sequelize, dataTypes) {
    var HideList = sequelize.define('HideList', {
        userId: DataTypes.INTEGER,
        projectId: DataTypes.INTEGER
    }, {});
    HideList.associate = function (models) {
        // associations can be defined here
    };
    return HideList;
};
