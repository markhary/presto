'use strict';

const utils = require('../utils/writer.js');
const Restaurant = require('../models').Restaurant;
const db = require('../models');

const debug = require('debug');

function buildTree(root, row) {
    // row has following variables
    //   int id
    //   string name
    //   string description
    //   int item_id
    //   string modifies_as
    //   int modifies
    //   int depth
    //   int root_id
    //
    //   We are going to create an array of new objects that look like:
    //   Response =
    //      id: row.id
    //      item_id: row.item_id
    //      name: name
    //      description: "row.modifies_as: + row.description"
    //      modifiers: []
    //
    //   - List of root_ids, this forms basis of our javascript array
    let id = row.id;
    let name = row.name;
    let description = row.modifies_as + ": " + row.description;
    let item_id = row.item_id;
    let modifies = row.modifies;
    let depth = row.depth;
    let root_id = row.root_id;

    if ( depth == 1 ) {
        root.push({
            'id': id, 
            'item_id': item_id,
            'name': name, 
            'description': description, 
            'modifiers': []
        });
    } else {
        var [modifiers, found] = findObject(root, root_id, id, depth, modifies, 2);

        // Insert this in at the proper depth for the proper item
        if ( found ) {
            modifiers.push({
                'id': id, 
                'item_id': item_id,
                'name': name, 
                'description': description, 
                'modifiers': []
            });
        }
    }
}

// A recursive function to find the object at the appropriate depth.  
// This is essentially a graph search.  This only searches nodes at the 
// right depth, this is O(N);
function findObject(root, root_id, id, depth, modifies, atDepth) {
    var result = null;

    let modifiers = [];
    let found = false;

    if (depth == atDepth) {
        for(var i=0; (i<root.length) && !found; i++) {
            if (root[i].id == modifies) {
                found = true;
                modifiers = root[i].modifiers;
            }
         }
    } else if (atDepth > depth ) {
        debug("atDepth > depth, cowardly refusing to do anything");
    } else {
        // Not at right depth, need to descend down into
        // children
        for(var i=0; (i<root.length) && !found; i++) {
            if ( root[i].modifiers.length > 0 ) {
                var childModifiers = root[i].modifiers;
                [modifiers, found] = findObject(childModifiers, root_id, id, depth, modifies, atDepth+1);
            }
        }
    }

    return [modifiers, found];
}

/**
 * Turn the response from a single array including depths
 * to a nested array
 */
function formatJSON(response) {
    var mapped = [];

    for ( var r in response ) {
        buildTree( mapped, response[r]);
    }

    return mapped;
}

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
                '    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.id' +
                ')' +
                'SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id' +
                '    FROM menu_items, "Items" ' +
                '    WHERE item_id = "Items".id' +
                '    ORDER BY root_id, depth, item_id ASC;' ;

            db.sequelize.query(sqlStatement, 
                { 
                    raw: true, 
                    replacements: [restaurantID],
                    type: db.sequelize.QueryTypes.SELECT,
                }
            ).then(response => {
                return resolve(utils.respondWithCode(200, formatJSON(response)));
            });
        });
    });
}
