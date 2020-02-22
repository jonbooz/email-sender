#!/usr/local/bin/node

const emailSender = require('./emailSender.js');

if (process.argv.length < 3) {
    throw 'driver requires a user name';
}

const event = { };
event.user = process.argv[2];

emailSender.handler(event);
