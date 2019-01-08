'use strict';

const utils = require('../utils/writer.js');
const Restaurant = require('../models').Restaurant;

/**
 * Retrive list of menu items available at restaurant
 * Returns a list of menu items
 *
 * restaurantID Long ID of restaurant to retrieve
 * returns List
 **/
exports.getItemsById = function(restaurantID) {

    return new Promise(function(resolve, reject) {
        Restaurant.findByPk(restaurantID).then(restaurant => {
            if ( restaurant == null ) {
                return resolve(utils.respondWithCode(404, 
                    {
                        error: 'restaurantID ' + restaurantID + ' not found'
                    } 
                ));
            }

            return resolve(utils.respondWithCode(200, restaurant));
        });
    });

    /*
    return Restaurant.findByPk(restaurantID).then(restaurant => {
        console.log(restaurant);

        if ( restaurant == null ) {
            console.log("404");
            utils.respondWithCode(404, 'Restaurant Not Found');
        }
        console.log("Going to return something, now sure what it is")
        utils.respondWithCode(200, restaurant);
    });
    */

    /*
    return Restaurant.find(restaurantID)
            .then(restaurant) => {
            if ( !restaurant ) {
                resolve(utils.respondWithCode(404, 'Restaurant Not Found'));
            }
            resolve(utils.respondWithCode(200, { "getting": "somewhere" }));
        };

    });
    */

    /*
    return Restaurant
        .findById(restaurantID)
        .then(restaurant) => {
            if (!restaurant) {
                return respondWithCode(404, 'Restaurant Not Found');
            }

            payload = [ {
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
            return respondWithCode(200, payload);
        }
        */
}
