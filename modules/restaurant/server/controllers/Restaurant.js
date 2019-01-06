'use strict';

var utils = require('../utils/writer.js');
var Restaurant = require('../service/RestaurantService');

module.exports.getItemsById = function getItemsById (req, res, next) {
  var restaurantID = req.swagger.params['restaurantID'].value;
  Restaurant.getItemsById(restaurantID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
