#!/bin/sh
# This script recreates how sequelize was initialized

SEQUELIZE_RC=.sequelizerc
SEQUELIZE_BIN=node_modules/.bin/sequelize

cd ../..

rm $SEQUELIZE_RC
cat <<EOT>> $SEQUELIZE_RC
var path = require('path');

module.exports = {
  'config': path.resolve('./', 'config/database.json'),
  'migrations-path': path.resolve('./', 'migrations'),
  'models-path': path.resolve('./', 'models'),
  'seeders-path': path.resolve('./', 'seeders')
}
EOT

$SEQUELIZE_BIN init
