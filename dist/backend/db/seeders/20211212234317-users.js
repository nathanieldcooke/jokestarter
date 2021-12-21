'use strict';
var bcrypt = require('bcryptjs');
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
                username: 'Demo User',
                hashedPassword: bcrypt.hashSync('password')
            }], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
