#!/bin/sh

sudo su - postgres
createuser --echo --pwprompt --createdb --no-createrole --no-superuser presto
createdb --owner=presto presto

