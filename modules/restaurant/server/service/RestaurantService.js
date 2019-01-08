'use strict';

const utils = require('../utils/writer.js');
const Restaurant = require('../models').Restaurant;
const db = require('../models');

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

            db.sequelize.query(
                'SELECT * FROM "Menus" WHERE restaurant_id = ?',
                { 
                    raw: true, 
                    replacements: [restaurantID],
                    type: db.sequelize.QueryTypes.SELECT,
                }
            ).then(response => {
                    return resolve(utils.respondWithCode(200, response));
                });
        });
    });
}
