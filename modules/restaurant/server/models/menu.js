'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    modifies: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {});
  Menu.associate = function(models) {
      Menu.belongsTo(models.Restaurant);
      Menu.belongsTo(models.Item);
  };
  return Menu;
};
