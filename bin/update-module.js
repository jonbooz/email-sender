#!/usr/local/bin/node

const Environment = require('../src/engine/environment.js');
const User = require('../src/models/User.js');
const Module = require('../src/models/Module.js');
const ActiveModule = require('../src/models/ActiveModule.js');

const env = new Environment();
const dataStore = env.getDataStore();

if (process.argv.length < 3) {
    throw "update-module requires a json file with module details";
}

console.log(process.argv[2]);
const moduleToLoad = require(process.argv[2]);
console.log(moduleToLoad);

(async () => {
    const user = await dataStore.getUser('jonbooz');

    console.log(user)
    const id = moduleToLoad.id;
    const existing = await dataStore.getModule(id);
    console.log(existing);
    let mod = null;
    if (typeof existing.id === 'undefined') {
        mod = new Module(moduleToLoad);

        const status = new ActiveModule({
            name: moduleToLoad.id,
            repeats: moduleToLoad.repeats,
            index: 0,
            times: 0
        });
        user.activeModules.push(status);
        console.log(user);
        await dataStore.saveUser(user);
    } else {
        mod = existing;
        for (let i in moduleToLoad.entries) {
            let entry = moduleToLoad.entries[i];
            mod.entries.push(entry);
        }
    }

    console.log(mod);
    await dataStore.saveModule(mod);
})();