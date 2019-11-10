'use strict';

const Environment = require('./engine/environment.js').Environment;
const Record = require('./models/Record').Record;

const DEFAULT_USER = "jonbooz";


const emailSenderHandler = async function(event, ctx, callback) {

    let userName = null;
    if (event.hasOwnProperty('context')) {
        userName = event.context.user.name;
    } else if (event.hasOwnProperty('user')) {
        userName = event.user;
    } else {
        userName = DEFAULT_USER;
    }

    const environment = new Environment();
    await environment.getProcess().send(new Record(userName));

};

exports.handler = emailSenderHandler;
