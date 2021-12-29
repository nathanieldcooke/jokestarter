"use strict";
// 'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var configIndex = require(__dirname + '/../../config/database.js')[env];
var db = {};
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
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
