'use strict';

const Context = require('../../models/Context.js');
const Module = require('../../models/Module.js');

module.exports = class ModuleContextAppender {
    /**
     * 
     * @param {[Module]} modules 
     * @param {Context} context 
     */
    async process(modules, context) {
        context.setModules(modules);
        return modules;
    }
}
