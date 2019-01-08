'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Menus',
          [
              {
                  id: 1,
                  restaurant_id: 1,
                  item_id: 1,
                  modifies: null,
                  description: 'Entre',
              },
              {
                  id: 2,
                  restaurant_id: 1,
                  item_id: 2,
                  modifies: null,
                  description: 'Entre',
              },
              {
                  id: 3,
                  restaurant_id: 1,
                  item_id: 3,
                  modifies: 1,
                  description: 'Side',
              },
              {
                  id: 4,
                  restaurant_id: 1,
                  item_id: 2,
                  modifies: 1,
                  description: 'Side',
              },
              {
                  id: 5,
                  restaurant_id: 1,
                  item_id: 4,
                  modifies: 1,
                  description: 'Preparation',
              },
              {
                  id: 6,
                  restaurant_id: 1,
                  item_id: 5,
                  modifies: 3,
                  description: 'Sauce',
              },
              {
                  id: 7,
                  restaurant_id: 1,
                  item_id: 6,
                  modifies: 4,
                  description: 'Sauce',
              },
              {
                  id: 8,
                  restaurant_id: 1,
                  item_id: 7,
                  modifies: 4,
                  description: 'Sauce',
              },
              {
                  id: 9,
                  restaurant_id: 1,
                  item_id: 8,
                  modifies: 4,
                  description: 'Sauce',
              },
              {
                  id: 10,
                  restaurant_id: 1,
                  item_id: 9,
                  modifies: 7,
                  description: 'Side',
              },
              {
                  id: 11,
                  restaurant_id: 2,
                  item_id: 10,
                  modifies: null,
                  description: 'Entre',
              },
              {
                  id: 12,
                  restaurant_id: 2,
                  item_id: 11,
                  modifies: 11,
                  description: 'Sauce',
              },
              {
                  id: 13,
                  restaurant_id: 2,
                  item_id: 12,
                  modifies: 11,
                  description: 'Sauce',
              },
              {
                  id: 14,
                  restaurant_id: 2,
                  item_id: 13,
                  modifies: 11,
                  description: 'Sauce',
              },
              {
                  id: 15,
                  restaurant_id: 2,
                  item_id: 14,
                  modifies: 12,
                  description: 'Side',
              },
              {
                  id: 16,
                  restaurant_id: 1,
                  item_id: 6,
                  modifies: 2,
                  description: 'Sauce',
              },
              {
                  id: 17,
                  restaurant_id: 1,
                  item_id: 7,
                  modifies: 2,
                  description: 'Sauce',
              },
              {
                  id: 18,
                  restaurant_id: 1,
                  item_id: 8,
                  modifies: 2,
                  description: 'Sauce',
              },
              {
                  id: 19,
                  restaurant_id: 1,
                  item_id: 9,
                  modifies: 16,
                  description: 'Side',
              },
          ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
