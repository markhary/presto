#!/bin/sh
# This script recreates how sequelize was provisioned

SEQUELIZE=node_modules/.bin/sequelize

cd ../..
$SEQUELIZE db:seed:undo:all
$SEQUELIZE db:migrate:undo:all
