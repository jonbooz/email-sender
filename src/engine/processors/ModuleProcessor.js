'use strict';

const Context = require('../../models/Context.js').Context;
const Module = require('../../models/Module.js').Module;
const ModuleEntry = require('../../models/ModuleEntry.js').ModuleEntry;

/**
 * This processor gets the appropriate entry from each
 * module for the given user in the context.
 */
module.exports = class ModuleProcessor {

    /**
     * 
     * @param {[Module]} modules 
     * @param {Context} context 
     */
    async process(modules, context) {
        const user = context.getUser();
        const entries = [ ];
        for (let i in modules) {
            const module = modules[i];
            const status = user.getActiveModule(module.id);
            entries.push(new ModuleEntry(module.heading, module.entries[status.index], module.format));
        }
        return entries;
    }
};