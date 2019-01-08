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

            let sqlStatement = 'WITH RECURSIVE menu_items(id, item_id, modifies_as, modifies, depth, root_id) AS (' +
                               '    SELECT m1.id, m1.item_id, m1.description, m1.modifies, 1, m1.id' +
                               '    FROM "Menus" m1 WHERE restaurant_id=? AND modifies IS NULL' +
                               '        UNION ALL' +
                               '    SELECT m1.id, m1.item_id, m1.description, m1.modifies, m2.depth+1, m2.root_id' +
                               '    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.item_id' +
                               ')' +
                               'SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id' +
                               '    FROM menu_items, "Items" ' +
                               '    WHERE item_id = "Items".id' +
                               '    ORDER BY root_id, depth ASC;' ;

            db.sequelize.query(sqlStatement, 
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
