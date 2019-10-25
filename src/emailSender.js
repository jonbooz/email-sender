'use strict';

const Environment = require('./engine/environment.js').Environment;
const Context = require('./models/Context.js').Context;

const DEFAULT_USER = "jonbooz";

const emailSenderHandler = async function(event, ctx, callback) {
    const environment = new Environment();
    const engine = environment.getEngine();

    let userName = null;
    if (event.hasOwnProperty('context')) {
        userName = event.context.user.name;
    } else if (event.hasOwnProperty('user')) {
        userName = event.user;
    } else {
        userName = DEFAULT_USER;
    }

    const user = await environment.getDataStore().getUser(userName);
    const context = new Context();
    context.user = user;
    context.logger = environment.getLogger();

    await engine.run(context);
};

exports.handler = emailSenderHandler;
