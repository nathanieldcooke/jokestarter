'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('./../models');
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
module.exports = function (sequelize, dataTypes) {
    var Bookmark = sequelize.define('Bookmark', {
        userId: DataTypes.INTEGER,
        projectId: DataTypes.INTEGER
    }, {});
    Bookmark.associate = function (_models) {
        // associations can be defined here
    };
    return Bookmark;
};
