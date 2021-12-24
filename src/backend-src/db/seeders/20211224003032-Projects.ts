'use strict';
import { QueryInterface } from "sequelize/types";
module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Projects', [
    {
      goal: null,
      endDate: null,
      title: 'Sexy Beasts',
      summary: 'Are you ready to gift your children some of the Hottest toys of the year. Look no further than our exclusive line of plush toys, with a fun twist',
      video: null,
      screenShot: null,
      creatorName: null,
      categoryId: null,
    },
    // {
    //   goal: null,
    //   endDate: null,
    //   title: null,
    //   summary: null,
    //   video: null,
    //   screenShot: null,
    //   creatorName: null,
    //   categoryId: null,
    // },
    // {
    //   goal: null,
    //   endDate: null,
    //   title: null,
    //   summary: null,
    //   video: null,
    //   screenShot: null,
    //   creatorName: null,
    //   categoryId: null,
    // },
    // {
    //   goal: null,
    //   endDate: null,
    //   title: null,
    //   summary: null,
    //   video: null,
    //   screenShot: null,
    //   creatorName: null,
    //   categoryId: null,
    // },
    // {
    //   goal: null,
    //   endDate: null,
    //   title: null,
    //   summary: null,
    //   video: null,
    //   screenShot: null,
    //   creatorName: null,
    //   categoryId: null,
    // },
    
  ], {});
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Projects', {}, {});
  }
};
