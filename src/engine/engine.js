'use strict';

const Context = require('../models/Context.js');

module.exports = class EmailSenderEngine {
    constructor(processor) {
        this.processor = processor;
        // TODO verify processor chain is valid?
    }

    /**
     * 
     * @param {Context} context 
     */
    async run(context) {
        return await this.processor.process(context, context);
    }
};