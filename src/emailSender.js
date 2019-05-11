'use strict';

const Environment = require('./engine/environment.js');
const Configurator = require('./engine/configurator.js');
const Context = require('./models/Context.js');

const emailSenderHandler = async function(event, ctx, callback) {
    const environment = new Environment();
    const configurator = new Configurator(environment);
    const engine = configurator.buildEngine();

    /*
    await environment.getDataStore().saveUser({
        asJson: function() {
            return {
                name: 'jonbooz',
                email: 'jon@jonbooz.com',
                activeModules: '[{"name":"jonbooz/header","repeats":-1,"index":0,"times":0}]'
            };
        }
    });

    await environment.getDataStore().saveModule({
        asJson: function() {
            return {
                id: 'jonbooz/header',
                heading: 'Always remember,',
                entries: '["Δικαίως ταῦτα πάσχεις˙ μᾶλλον δὴ θέλεις ἀγαθὸς αὔριον γενέσθαι ἢ σήμερον εἶναι."]'
            }
        }
    });
    */

    const user = await environment.getDataStore().getUser('jonbooz');
    const context = new Context();
    context.setUser(user);
    context.setLogLevel(environment.getLogLevel());
    context.setLogger(environment.getLogger());

    engine.run(context);
};

exports.handler = emailSenderHandler;

emailSenderHandler();

/*

Let's have an engine package that provides processors.

These processors take some object, do something, and return
some object.

Processors are chained together in the engine definition
and determine how things happen.

Open question? How to handle multi users? The engine runs
per user, with this handler controlling the engine kick off.
*/