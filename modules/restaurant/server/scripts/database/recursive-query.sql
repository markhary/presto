--
-- Basic query, returning all items but not in hierarchical form
--
SELECT "Items".name, "Items".description, "Menus".item_id, "Menus".description, "Menus".modifies 
    FROM "Menus", "Items"
    WHERE item_id = "Items".id AND "Menus".restaurant_id = 1;


--
-- Recursive query using Common Table Expressions (CTEs)
-- and tracking depth to avoid cycles
--
\echo Restaurant 1
WITH RECURSIVE menu_items(id, item_id, modifies_as, modifies, depth, root_id) AS (
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, 1, m1.id
    FROM "Menus" m1 WHERE restaurant_id=1 AND modifies IS NULL
        UNION ALL
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, m2.depth+1, m2.root_id
    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.item_id
)
SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id
    FROM menu_items, "Items" 
    WHERE item_id = "Items".id
    ORDER BY root_id, depth ASC;

-- Results based on test data:
-- Restaurant 1
-- id |           name           |             description             | item_id | description | modifies | depth | root_id 
-- ---+--------------------------+-------------------------------------+---------+-------------+----------+-------+---------
--  1 | Hamburger                | Hot meat sandwich                   |       1 | Entre       |          |     1 |       1
--  5 | Lettuce Wrap             | Paleo option                        |       4 | Preparation |        1 |     2 |       1
--  3 | French Fries             | Crispy potatoes                     |       3 | Side        |        1 |     2 |       1
--  4 | Green Salad              | Something green                     |       2 | Side        |        1 |     2 |       1
--  7 | Blue Cheese Dressing     | M&M (Mayonnaise & Mold), yummmmm... |       6 | Sauce       |        2 |     3 |       1
--  9 | Thousand Island Dressing | Because 999 Island sucked           |       8 | Sauce       |        2 |     3 |       1
--  8 | Oil and Vinegar          | Ye olde standarde                   |       7 | Sauce       |        2 |     3 |       1
--  6 | Ketchup                  | Tomatoes with sugar                 |       5 | Sauce       |        3 |     3 |       1
-- 10 | Blue Cheese              | Never enough                        |       9 | Side        |        6 |     4 |       1
--  2 | Green Salad              | Something green                     |       2 | Entre       |          |     1 |       2
--  9 | Thousand Island Dressing | Because 999 Island sucked           |       8 | Sauce       |        2 |     2 |       2
--  8 | Oil and Vinegar          | Ye olde standarde                   |       7 | Sauce       |        2 |     2 |       2
--  7 | Blue Cheese Dressing     | M&M (Mayonnaise & Mold), yummmmm... |       6 | Sauce       |        2 |     2 |       2
-- 10 | Blue Cheese              | Never enough                        |       9 | Side        |        6 |     3 |       2

