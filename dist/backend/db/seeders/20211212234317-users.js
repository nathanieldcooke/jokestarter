'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcryptjs');
module.exports = {
    up: function (queryInterface) {
        return queryInterface.bulkInsert('Users', [{
                username: 'Demo User',
                hashedPassword: bcrypt.hashSync('password')
            }], {});
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('Users', {}, {});
    }
};
