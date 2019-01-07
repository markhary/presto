'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Menus',
          [
              {
                  restaurant_id: 1,
                  item_id: 1,
                  modifies: null,
                  description: 'Hot meat sandwich',
              },
              {
                  restaurant_id: 1,
                  item_id: 2,
                  modifies: null,
                  description: 'Green Salad Entre',
              },
              {
                  restaurant_id: 1,
                  item_id: 3,
                  modifies: 1,
                  description: 'Side French Fries',
              },
              {
                  restaurant_id: 1,
                  item_id: 2,
                  modifies: 1,
                  description: 'Side Green Salad',
              },
              {
                  restaurant_id: 1,
                  item_id: 4,
                  modifies: 1,
                  description: 'Paleo option',
              },
              {
                  restaurant_id: 1,
                  item_id: 5,
                  modifies: 3,
                  description: 'Tomatoes with sugar',
              },
              {
                  restaurant_id: 1,
                  item_id: 6,
                  modifies: 2,
                  description: 'Salad dressing',
              },
              {
                  restaurant_id: 1,
                  item_id: 7,
                  modifies: 2,
                  description: 'Ye olde standarde',
              },
              {
                  restaurant_id: 1,
                  item_id: 8,
                  modifies: 2,
                  description: 'Because 999 Island sucked',
              },
              {
                  restaurant_id: 1,
                  item_id: 9,
                  modifies: 6,
                  description: 'Never enough',
              },
              {
                  restaurant_id: 2,
                  item_id: 10,
                  modifies: null,
                  description: 'The only entre',
              },
              {
                  restaurant_id: 2,
                  item_id: 11,
                  modifies: 10,
                  description: 'Salad option',
              },
              {
                  restaurant_id: 2,
                  item_id: 12,
                  modifies: 10,
                  description: 'Ye olde standarde',
              },
              {
                  restaurant_id: 2,
                  item_id: 13,
                  modifies: 10,
                  description: 'Because 999 Island sucked',
              },
              {
                  restaurant_id: 2,
                  item_id: 14,
                  modifies: 11,
                  description: 'Never enough',
              },
          ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
