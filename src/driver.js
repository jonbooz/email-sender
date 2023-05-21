#!/usr/local/bin/node

const emailSender = require('./emailSender.js');

const event = { };
if (process.argv.length >= 3) {
    event.user = process.argv[2];
} else {
    console.log("Running email-sender against all users.");
}

emailSender.handler(event);
