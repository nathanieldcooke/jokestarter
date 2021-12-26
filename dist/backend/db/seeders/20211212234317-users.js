'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcryptjs');
module.exports = {
    up: function (queryInterface) {
        return queryInterface.bulkInsert('Users', [
            {
                username: 'Demo User',
                email: 'demo@user.com',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                username: 'Other User',
                email: 'other@user.com',
                hashedPassword: bcrypt.hashSync('password')
            }
        ], {});
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('Users', {}, {});
    }
};
