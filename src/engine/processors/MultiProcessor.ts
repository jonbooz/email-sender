import { Context } from "../../models/Context";
import { Processor } from "./Processor";

/**
 * This processes iterates over a list of processors in order.
 *
 * Passing the results through as the input to the next processor.
 */
export class MultiProcessor implements Processor<any, any> {

    constructor(private readonly _processors: Array<Processor<any, any>>) { }

    async process(input: any, context: Context): Promise<any> {
        context.logger.log("MultiProcessor on " + this._processors.length + " processors");
        let last: any = null;
        for (let processor of this._processors) {
            context.logger.log("MultiProcessor: processing: " + processor.constructor.name);
            last = await processor.process(last, context);
            context.logger.debug(last);
        }
        return last;
    }

}
