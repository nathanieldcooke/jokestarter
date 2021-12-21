"use strict";
var config = require('./index.js');
var db = config.db;
var username = db.username;
var password = db.password;
var database = db.database;
var host = db.host;
var appConfig = {
    development: {
        username: username,
        password: password,
        database: database,
        host: host,
        dialect: 'postgres',
        seederStorage: 'sequelize'
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
module.exports = appConfig;
