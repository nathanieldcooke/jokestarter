'use strict'
export {}
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const Category = sequelize.define('Category', {
    name: dataTypes.STRING(25),
    loggedIn: dataTypes.BOOLEAN
  }, {});
  Category.associate = function(models:any) {
    Category.hasMany(models.Project, { foreignKey: 'categoryId' });
  };

  Category.getAllCategories = async function () {
    return await Category.findAll()
  }

  Category.getCategoryId = async function (name:string) {
    const category = await Category.findOne({
      where: {
        name
      }
    })
    return category.id
  }
  return Category;
};