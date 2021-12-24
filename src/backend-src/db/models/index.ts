'use strict';

const fs = require('fs');
const path = require('path');
// const Sequelize = require('sequelize');
require('./type')
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configIndex = require(__dirname + '/../../config/database.js')[env];
const dbIndex:any = {};

let sequelize: any;
if (configIndex.use_env_variable) {
  sequelize = new Sequelize(process.env[configIndex.use_env_variable], configIndex);
} else {
  sequelize = new Sequelize(configIndex.database, configIndex.username, configIndex.password, configIndex);
}

fs
.readdirSync(__dirname)
.filter((file:any) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach((file:any) => {
  const model = sequelize['import'](path.join(__dirname, file));
  dbIndex[model.name] = model;
});

Object.keys(dbIndex).forEach(modelName => {
  if (dbIndex[modelName].associate) {
    dbIndex[modelName].associate(dbIndex);
  }
});

dbIndex.sequelize = sequelize;
dbIndex.Sequelize = Sequelize;

module.exports = dbIndex;
