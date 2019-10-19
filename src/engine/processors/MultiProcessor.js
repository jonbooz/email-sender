'use strict';

/**
 *
 * @type {MultiProcessor}
 */
module.exports = class MultiProcessor {

    constructor(processors) {
        this._processors = processors;
    }

    async process(input, context) {
        context.getLogger().log("MultiProcessor on " + this._processors.length + " processors");
        for (let i in this._processors) {
            let processor = this._processors[i];
            context.getLogger().log("MultiProcessor: processing: " + processor.constructor.name);
            input = await processor.process(input, context);

            if (context.getLogLevel() === 'debug') {
                context.getLogger().log(input);
            }
        }
        return input;
    }
};