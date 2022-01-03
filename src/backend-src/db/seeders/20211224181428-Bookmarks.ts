'use strict';

import { QueryInterface } from "sequelize/types";
const { Project, User } = require('./../models')

module.exports = {
  up: async (queryInterface: QueryInterface,) => {
    return queryInterface.bulkInsert('Bookmarks', [
      {
        userId: await User.getUserId('Demo User'),
        projectId: await Project.getProjectId('Sexy Beasts')
      },
      {
        userId: await User.getUserId('Demo User'),
        projectId: await Project.getProjectId('Jalapeño Milk')
      },
      {
        userId: await User.getUserId('Demo User'),
        projectId: await Project.getProjectId('Playground For Seniors')
      },
    ], {});
  },

  down: (queryInterface: QueryInterface,) => {
    return queryInterface.bulkDelete('Bookmarks', {}, {});
  }
};
