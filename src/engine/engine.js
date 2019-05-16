'use strict';

const Context = require('../models/Context.js');

module.exports = class EmailSenderEngine {
    constructor(processors) {
        this.processors = processors;
        // TODO verify processor chain is valid?
    }

    /**
     * 
     * @param {Context} context 
     */
    async run(context) {
        context.getLogger().log("Running on " + this.processors.length + " processors");
        let input = context;
        for (let i in this.processors) {
            let processor = this.processors[i];
            context.getLogger().log("Running on processor: " + processor.constructor.name);
            input = await processor.process(input, context);

            if (context.getLogLevel() === 'debug') {
                context.getLogger().log(input);
            }
        }
        return input;
    }
};