'use strict';

import { QueryInterface } from "sequelize/types";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Top',
        loggedIn: false,
      },
      {
        name: 'Toys',
        loggedIn: false,
      },
      {
        name: 'Food',
        loggedIn: false,
      },
      {
        name: 'Services',
        loggedIn: false,
      },
      {
        name: 'Misc',
        loggedIn: false,
      },
      {
        name: 'Bookmarks',
        loggedIn: true,
      },
      {
        name: 'Contributed',
        loggedIn: true,
      },

  ], {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Categories', {}, {});
  }
};
