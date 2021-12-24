'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: function (queryInterface) {
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
    down: function (queryInterface) {
        return queryInterface.bulkDelete('Projects', {}, {});
    }
};
