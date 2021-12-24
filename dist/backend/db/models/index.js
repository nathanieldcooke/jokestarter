'use strict';
var fs = require('fs');
var path = require('path');
// const Sequelize = require('sequelize');
require('./type');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var configIndex = require(__dirname + '/../../config/database.js')[env];
var dbIndex = {};
var sequelize;
if (configIndex.use_env_variable) {
    sequelize = new Sequelize(process.env[configIndex.use_env_variable], configIndex);
}
else {
    sequelize = new Sequelize(configIndex.database, configIndex.username, configIndex.password, configIndex);
}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    dbIndex[model.name] = model;
});
Object.keys(dbIndex).forEach(function (modelName) {
    if (dbIndex[modelName].associate) {
        dbIndex[modelName].associate(dbIndex);
    }
});
dbIndex.sequelize = sequelize;
dbIndex.Sequelize = Sequelize;
module.exports = dbIndex;
