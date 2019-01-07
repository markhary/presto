'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Items',
          [
              {
                  id: 1,
                  restaurant_id: 1,
                  name: 'Hamburger',
                  description: 'Hot meat sandwich',
              },
              {
                  id: 2,
                  restaurant_id: 1,
                  name: 'Green Salad',
                  description: 'Something green',
              },
              {
                  id: 3,
                  restaurant_id: 1,
                  name: 'French Fries',
                  description: 'Crispy potatoes',
              },
              {
                  id: 4,
                  restaurant_id: 1,
                  name: 'Lettuce Wrap',
                  description: 'Paleo option',
              },
              {
                  id: 5,
                  restaurant_id: 1,
                  name: 'Ketchup',
                  description: 'Tomatoes with sugar',
              },
              {
                  id: 6,
                  restaurant_id: 1,
                  name: 'Blue Cheese Dressing',
                  description: 'Salad option',
              },
              {
                  id: 7,
                  restaurant_id: 1,
                  name: 'Oil and Vinegar',
                  description: 'Ye olde standarde',
              },
              {
                  id: 8,
                  restaurant_id: 1,
                  name: 'Thousand Island Dressing',
                  description: 'Because 999 Island sucked',
              },
              {
                  id: 9,
                  restaurant_id: 1,
                  name: 'Blue Cheese',
                  description: 'Never enough',
              },
              {
                  id: 10,
                  restaurant_id: 2,
                  name: 'Green Salad',
                  description: 'Something green',
              },
              {
                  id: 11,
                  restaurant_id: 2,
                  name: 'Blue Cheese Dressing',
                  description: 'Salad option',
              },
              {
                  id: 12,
                  restaurant_id: 2,
                  name: 'Oil and Vinegar',
                  description: 'Ye olde standarde',
              },
              {
                  id: 13,
                  restaurant_id: 2,
                  name: 'Thousand Island Dressing',
                  description: 'Because 999 Island sucked',
              },
              {
                  id: 14,
                  restaurant_id: 2,
                  name: 'Blue Cheese',
                  description: 'Never enough',
              },
          ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
