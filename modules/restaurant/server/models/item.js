'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {});
  Item.associate = function(models) {
      Item.hasMany(models.Menu, {
          foreignKey: 'item_id',
          as: 'items',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
      Item.hasMany(models.Menu, {
          foreignKey: 'modifies',
          as: 'modifiers',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
      Item.belongsTo(models.Restaurant);
  };
  return Item;
};
