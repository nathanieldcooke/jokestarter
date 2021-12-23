'use strict';

import { QueryInterface } from "sequelize/types";
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface: QueryInterface) => {

    return queryInterface.bulkInsert('Users', [{
      username: 'Demo User',
      email: 'demo@user.com',
      hashedPassword: bcrypt.hashSync('password')
    }], {});
  },

  down: (queryInterface: QueryInterface) => {

    return queryInterface.bulkDelete('Users', {}, {});
  }
};
