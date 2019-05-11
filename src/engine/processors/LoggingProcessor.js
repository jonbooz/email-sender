'use strict';

/**
 * This exports a LoggingProcessor, which simply prints the
 * input to a given output stream and returns the input
 * as is.
 * 
 * This can optionally print out the context (default is to
 * not print).
 */
module.exports = class LoggingProcessor {
    constructor(outputStream, logContext) {
        this.outputStream = outputStream;
        if (typeof logContext !== 'undefined') {
            this.logContext = logContext;
        } else {
            this.logContext = false;
        }
    }

    async process(input, context) {
        this.outputStream.log(input);
        if (this.logContext) {
            this.outputStream.log(context);
        }
        return input;
    }
}