#!/usr/local/bin/node

const Environment = require('../build/tsc/src/engine/environment').Environment;
const ActiveModule = require('../build/tsc/src/models/ActiveModule.js').ActiveModule;
const Include = require('../build/tsc/src/models/ActiveModule.js').Include;

const env = new Environment();
const dataStore = env.getDataStore();

if (process.argv.length < 5) {
    throw "Usage: ./edit-user <username> <add-module|remove-module|set-module|set-max-limited-modules> <module_name|max_limited_modules>";
}

const username = process.argv[2];
const action = process.argv[3];
const moduleName = process.argv[4];
let option = null;
if (process.argv.length === 6) {
    option = process.argv[5];
}


const add = async (user, moduleName, option) => {
    const module = await dataStore.getModule(moduleName);
    if (module === null || module.id === undefined) {
        throw "Module: " + moduleName + " does not exist.";
    }
    let include = 'always';
    if (option !== null) {
        include = option;
    }
    const status = new ActiveModule({
        name: moduleName,
        index: 0,
        include: include
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

const setModule = (user, moduleName, option) => {
    if (option === null) {
        throw "Usage: ./edit-user <username> set-module <module_name> <option>";
    }

    if (option === Include.Always || option === Include.Limit) {
        if (user.hasActiveModule(moduleName)) {
            let mod = user.getActiveModule(moduleName);
            mod.include = option;
        } else {
            throw "User " + user.name + " does not have module " + moduleName;
        }
    }

    return user;
};

const setMaxLimitedModules = (user, maxLimitedModules) => {
    user.maxLimitedModules = maxLimitedModules;
    return user;
};

(async () => {
    let user = await dataStore.getUser(username);
    if (user.name === undefined) {
        throw "User " + username + " does not exist.";
    }

    if (action === 'add-module') {
        user = await add(user, moduleName, option);
    } else if (action === 'remove-module') {
        user = remove(user, moduleName)
    } else if (action === 'reorder') {
        throw "reorder is not yet supported.";
    } else if (action === 'set-module') {
        user = setModule(user, moduleName, option);
    } else if (action === 'set-max-limited-modules') {
        user = setMaxLimitedModules(user, moduleName);
    } else {
        throw "Unrecognized action " + action + ". Please select from {add|remove|reorder}";
    }

    console.log(user.getDataForSaving());

    await dataStore.saveUser(user);
})();
