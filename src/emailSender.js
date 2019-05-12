'use strict';

const Environment = require('./engine/environment.js');
const Configurator = require('./engine/configurator.js');
const Context = require('./models/Context.js');

const emailSenderHandler = async function(event, ctx, callback) {
    const environment = new Environment();
    const configurator = new Configurator(environment);
    const engine = configurator.buildEngine();

    const user = await environment.getDataStore().getUser('jonbooz');
    const context = new Context();
    context.setUser(user);
    context.setLogLevel(environment.getLogLevel());
    context.setLogger(environment.getLogger());

    engine.run(context);
};

exports.handler = emailSenderHandler;

