'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface:any, Sequelize:any) => {

    return queryInterface.bulkInsert('Users', [{
      username: 'Demo User',
      hashedPassword: bcrypt.hashSync('password')
    }], {});
  },

  down: (queryInterface:any, Sequelize:any) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
