'use strict';

export {}

const db = require('./../models')

const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Bookmark.associate = function(_models: typeof db) {
    // associations can be defined here
  };
  return Bookmark;
};