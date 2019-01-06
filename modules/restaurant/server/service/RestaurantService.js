'use strict';


/**
 * Retrive list of menu items available at restaurant
 * Returns a list of menu items
 *
 * restaurantID Long ID of restaurant to retrieve
 * returns List
 **/
exports.getItemsById = function(restaurantID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 1,
  "name" : "Hamburger",
  "description" : "Sandwich with meat",
  "modifiers" : [ {
    "id" : 100,
    "name" : "Ketchup",
    "description" : "Tomato sauce with sugar"
  }, {
    "id" : 101,
    "name" : "Lettuce",
    "description" : "Leafy"
  } ]
}, {
  "id" : 2,
  "name" : "French fries",
  "description" : "Potatoes done properly"
}, {
  "id" : 3,
  "name" : "Salad",
  "description" : "More greenery",
  "modifiers" : [ {
    "id" : 300,
    "name" : "Blue Cheese Dressing",
    "description" : "With blue cheese",
    "modifiers" : [ {
      "id" : 3000,
      "name" : "Extra blue cheese",
      "description" : "Can't get enough"
    } ]
  }, {
    "id" : 301,
    "name" : "Oil and Vinegar",
    "description" : "A trusted classic"
  }, {
    "id" : 302,
    "name" : "Thousand Island Dressing",
    "description" : "Because 999 Island sucked"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

