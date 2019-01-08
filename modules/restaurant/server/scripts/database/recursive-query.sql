-- Results based on test data:
-- psql --dbname=presto --username=presto --password

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
    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.id
)
SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id
    FROM menu_items, "Items" 
    WHERE item_id = "Items".id
    ORDER BY root_id, depth, item_id ASC;

--  id |           name           |             description             | item_id | modifies_as | modifies | depth | root_id 
-- ----+--------------------------+-------------------------------------+---------+-------------+----------+-------+---------
--   1 | Hamburger                | Hot meat sandwich                   |       1 | Entre       |          |     1 |       1
--   4 | Green Salad              | Something green                     |       2 | Side        |        1 |     2 |       1
--   3 | French Fries             | Crispy potatoes                     |       3 | Side        |        1 |     2 |       1
--   5 | Lettuce Wrap             | Paleo option                        |       4 | Preparation |        1 |     2 |       1
--   6 | Ketchup                  | Tomatoes with sugar                 |       5 | Sauce       |        3 |     3 |       1
--   7 | Blue Cheese Dressing     | M&M (Mayonnaise & Mold), yummmmm... |       6 | Sauce       |        4 |     3 |       1
--   8 | Oil and Vinegar          | Ye olde standarde                   |       7 | Sauce       |        4 |     3 |       1
--   9 | Thousand Island Dressing | Because 999 Island sucked           |       8 | Sauce       |        4 |     3 |       1
--  10 | Blue Cheese              | Never enough                        |       9 | Side        |        7 |     4 |       1
--   2 | Green Salad              | Something green                     |       2 | Entre       |          |     1 |       2
--  16 | Blue Cheese Dressing     | M&M (Mayonnaise & Mold), yummmmm... |       6 | Sauce       |        2 |     2 |       2
--  17 | Oil and Vinegar          | Ye olde standarde                   |       7 | Sauce       |        2 |     2 |       2
--  18 | Thousand Island Dressing | Because 999 Island sucked           |       8 | Sauce       |        2 |     2 |       2
--  19 | Blue Cheese              | Never enough                        |       9 | Side        |       16 |     3 |       2
-- (14 rows)


\echo Restaurant 2
WITH RECURSIVE menu_items(id, item_id, modifies_as, modifies, depth, root_id) AS (
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, 1, m1.id
    FROM "Menus" m1 WHERE restaurant_id=2 AND modifies IS NULL
        UNION ALL
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, m2.depth+1, m2.root_id
    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.id
)
SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id
    FROM menu_items, "Items" 
    WHERE item_id = "Items".id
    ORDER BY root_id, depth, item_id ASC;

--  id |           name           |        description        | item_id | modifies_as | modifies | depth | root_id 
-- ----+--------------------------+---------------------------+---------+-------------+----------+-------+---------
--  11 | Green Salad              | Something green           |      10 | Entre       |          |     1 |      11
--  12 | Blue Cheese Dressing     | Salad option              |      11 | Sauce       |       11 |     2 |      11
--  13 | Oil and Vinegar          | Ye olde standarde         |      12 | Sauce       |       11 |     2 |      11
--  14 | Thousand Island Dressing | Because 999 Island sucked |      13 | Sauce       |       11 |     2 |      11
--  15 | Blue Cheese              | Never enough              |      14 | Side        |       12 |     3 |      11
-- (5 rows)

\echo Restaurant 3
WITH RECURSIVE menu_items(id, item_id, modifies_as, modifies, depth, root_id) AS (
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, 1, m1.id
    FROM "Menus" m1 WHERE restaurant_id=3 AND modifies IS NULL
        UNION ALL
    SELECT m1.id, m1.item_id, m1.description, m1.modifies, m2.depth+1, m2.root_id
    FROM "Menus" m1, menu_items m2 WHERE m1.modifies = m2.id
)
SELECT menu_items.id, "Items".name, "Items".description, item_id, menu_items.modifies_as, modifies, depth, root_id
    FROM menu_items, "Items" 
    WHERE item_id = "Items".id
    ORDER BY root_id, depth, item_id ASC;

--  id | name | description | item_id | modifies_as | modifies | depth | root_id 
-- ----+------+-------------+---------+-------------+----------+-------+---------
-- (0 rows)

