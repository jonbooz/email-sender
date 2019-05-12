'use strict';

const Context = require('../../models/Context.js');
const DataStore = require('../../services/DataStore.js');

/**
 * This processor updates the user's active module
 * records after having sent the user a new email.
 */
module.exports = class UserUpdateProcessor {
    /**
     * 
     * @param {DataStore} dataStore 
     */
    constructor(dataStore) {
        this._dataStore = dataStore;
    }

    /**
     * 
     * @param {*} input 
     * @param {Context} context 
     */
    async process(input, context) {
        const user = context.getUser();
        for (let i in user.activeModules) {
            let activeModule = user.activeModules[i];
            if (activeModule.repeats < 0) {
                continue;
            } else if (activeModule.times < activeModule.repeats) {
                activeModule.times += 1;
            } else {
                let mod = context.getModule(activeModule.name);
                let newIndex = activeModule.index + 1;
                if (newIndex >= mod.entries.length) {
                    newIndex = 0;
                }
                activeModule.index = newIndex;
            }
        }
        this._dataStore.saveUser(user);
        return user;
    }
};