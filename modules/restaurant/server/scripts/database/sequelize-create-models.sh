#!/bin/sh
# This script recreates how sequelize was provisioned

SEQUELIZE=node_modules/.bin/sequelize

cd ../..
$SEQUELIZE model:create --name Restaurant --attributes "name:string, description:string"
$SEQUELIZE model:create --name Item --attributes "restaurant_id:integer, name:string, description:string"
$SEQUELIZE model:create --name Menu --attributes "restaurant_id:integer, item_id:integer, modifies:integer, description:string"
