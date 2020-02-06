#!/usr/local/bin/node

const Environment = require('../build/tsc/src/engine/environment').Environment;
const ActiveModule = require('../build/tsc/src/models/ActiveModule.js').ActiveModule;

const env = new Environment();
const dataStore = env.getDataStore();

if (process.argv.length < 5) {
    throw "Usage: ./edit-user <username> <add|remove> <module_name>"
}

const username = process.argv[2];
const action = process.argv[3];
const moduleName = process.argv[4];


const add = async (user, moduleName) => {
    const module = await dataStore.getModule(moduleName);
    if (module === null || module.id === undefined) {
        throw "Module: " + moduleName + " does not exist.";
    }
    const status = new ActiveModule({
        name: moduleName,
        repeats: 0,
        index: 0,
        times: 0
    });
    if (user.activeModules === null) {
        user.activeModules = [ ];
    }
    user.activeModules.push(status);
    return user;
};

const remove = (user, moduleName) => {
    const oldModules = user.activeModules;
    user.activeModules = [];
    for (let i in oldModules) {
        let mod = oldModules[i];
        if (mod.name !== moduleName) {
            user.activeModules.push(mod);
        }
    }
    return user;
};

(async () => {
    let user = await dataStore.getUser(username);
    if (user == null) {
        throw "User " + username + " does not exist.";
    }

    if (action === 'add') {
        user = await add(user, moduleName);
    } else if (action === 'remove') {
        user = remove(user, moduleName)
    } else if (action === 'reorder') {
        throw "reorder is not yet supported.";
    } else {
        throw "Unrecognized action " + action + ". Please select from {add|remove|reorder}";
    }

    await dataStore.saveUser(user);
})();