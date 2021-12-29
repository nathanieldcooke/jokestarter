// 'use strict';

export {}

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configIndex = require(__dirname + '/../../config/database.js')[env];
const db:any = {};

let sequelize:typeof Sequelize;
if (configIndex.use_env_variable) {
  sequelize = new Sequelize(process.env[configIndex.use_env_variable], configIndex);
} else {
  sequelize = new Sequelize(configIndex.database, configIndex.username, configIndex.password, configIndex);
}

fs
.readdirSync(__dirname)
.filter((file: string) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach((file: string) => {
  const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
