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
        context.logger.log("MultiProcessor on " + this._processors.length + " processors");
        for (let i in this._processors) {
            let processor = this._processors[i];
            context.logger.log("MultiProcessor: processing: " + processor.constructor.name);
            input = await processor.process(input, context);
            context.logger.debug(input);
        }
        return input;
    }
};