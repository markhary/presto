#!/bin/sh
# This script recreates how sequelize was provisioned

SEQUELIZE=node_modules/.bin/sequelize

cd ../..
# create if it hasn't already been created
$SEQUELIZE db:create
# clear all tables if it already exists
$SEQUELIZE db:migrate:undo:all
# recreate tables
$SEQUELIZE db:migrate
# seed tables - this lets us specify the foreign key ints
$SEQUELIZE db:seed:all
