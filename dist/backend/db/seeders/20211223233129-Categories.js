'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: function (queryInterface) {
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
    down: function (queryInterface) {
        return queryInterface.bulkDelete('Categories', {}, {});
    }
};
