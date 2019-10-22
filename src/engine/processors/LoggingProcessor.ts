import { Context } from "../../models/Context";
import { Processor } from "./Processor";
import { Logger } from "../../utils/logging/Logger";

/**
 * This exports a LoggingProcessor, which simply prints the
 * input to a given output stream and returns the input
 * as is.
 * 
 * This can optionally print out the context (default is to
 * not print).
 */

export class LoggingProcessor implements Processor<any, any> {

    private readonly _logger: Logger;
    private readonly _logContext: boolean;

    constructor(logger: Logger, logContext = false) {
        this._logger = logger;
        this._logContext = logContext;
    }

    async process(input: any, context: Context): Promise<any> {
        this._logger.log(input);
        if (this._logContext) {
            this._logger.log(context);
        }
        return input;
    }
}
