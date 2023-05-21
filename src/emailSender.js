'use strict';

const Environment = require('./engine/environment').Environment;
const Record = require('./models/Record').Record;

const getUserNames = async function(event, environment) {
    if (event.hasOwnProperty('context')) {
        return [event.context.user.name];
    } else if (event.hasOwnProperty('user')) {
        return [event.user];
    }

    return await environment.getDataStore().getActiveUsers();
};

const emailSenderHandler = async function(event, ctx, callback) {

    const environment = new Environment();
    const users = await getUserNames(event, environment);
    const processes = users.map(u => environment.getProcess().send(new Record(u)));
    return await Promise.allSettled(processes)
        .then(responses => {
            console.log(responses);
            return true;
        });
};

exports.handler = emailSenderHandler;
