'use strict';

const Context = require('../../models/Context.js');
const Module = require('../../models/Module.js');

/**
 * This processor sorts the modules returned for a user based on that user's
 * list of active modules.
 */
module.exports = class ModuleSortingProcessor {

    /**
     * 
     * @param {[Module]} modules 
     * @param {Context} context 
     */
    async process(modules, context) {
        const user = context.user;
        const modulesByName = { };
        for (let i in modules) {
            let module = modules[i];
            modulesByName[module.id] = module;
        }
        const sortedModules = [ ];
        for (let i in user.activeModules) {
            sortedModules.push(modulesByName[user.activeModules[i].name]);
        }

        return sortedModules;
    }
};