'use strict';

const Environment = require('./engine/environment.js');
const Context = require('./models/Context.js');

const DEFAULT_USER = "jonbooz";

const emailSenderHandler = async function(event, ctx, callback) {
    const environment = new Environment();
    const engine = environment.getEngine();

    let userName = null;
    if (event.hasOwnProperty('user')) {
        userName = event.user;
    } else {
        userName = DEFAULT_USER;
    }

    const user = await environment.getDataStore().getUser(userName);
    const context = new Context();
    context.setUser(user);
    context.setLogLevel(environment.getLogLevel());
    context.setLogger(environment.getLogger());

    await engine.run(context);
};

exports.handler = emailSenderHandler;