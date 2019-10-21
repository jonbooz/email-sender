'use strict';

const _ = require('lodash');

const DataStore = require('../../services/DataStore.js');
const Context = require('../../models/Context.js');

/**
 * This takes the user from the context and retrieves that
 * user's active Modules.
 */
module.exports = class ModuleRetriever {
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
        const user = context.user;
        return await this._dataStore.getModules(user.name)
            .then(data => data.filter((x) => user.hasActiveModule(x.id)));

        // TODO add support for global modules
    }
};