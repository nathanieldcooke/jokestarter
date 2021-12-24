'use strict';
require('./type')

module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const Category = sequelize.define('Category', {
    name: dataTypes.STRING(25),
    loggedIn: dataTypes.BOOLEAN
  }, {});
  Category.associate = function(models:any) {
    // associations can be defined here
  };

  Category.getAllCategories = async function () {
    return await Category.findAll()
  }
  return Category;
};