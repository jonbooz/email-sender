#!/bin/bash

if [ -z "$4" ]; then
    echo "Usage: ./script <user> <csv-file> <title> <title-tag>"
    exit 1
fi

USER_NAME=$1
CSV_FILE=$2
TITLE=$3
TITLE_TAG=$4

./bin/import-kindle-notes.js "$2" "$3" "$1/rn-$4"
./bin/edit-user.js $1 add-module "$1/rn-$4" limit
