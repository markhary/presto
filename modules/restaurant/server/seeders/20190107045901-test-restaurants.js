'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Restaurants', 
          [
              {
                  id: 1,
                  name: 'Hamburger Town',
                  description: 'Full menu'
              },
              {
                  id: 2,
                  name: 'Salad City',
                  description: 'Salad only'
              },
              {
                  id: 3,
                  name: 'Empty Village',
                  description: 'Empty menu'
              }
          ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
