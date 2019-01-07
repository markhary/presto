'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
  }, {});
  Restaurant.associate = function(models) {
      Restaurant.hasMany(models.Item, {
          foreignKey: 'restaurant_id',
          as: 'items',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
      Restaurant.hasMany(models.Menu, {
          foreignKey: 'restaurant_id',
          as: 'menuItems',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
  };
  return Restaurant;
};
