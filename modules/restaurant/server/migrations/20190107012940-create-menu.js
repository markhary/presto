'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Restaurants',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      item_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Items',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      modifies: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'Items',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Menus');
  }
};
