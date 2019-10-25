import {Context} from "../models/Context";
import {Processor} from "./processors/Processor";

export class EmailSenderEngine {
    constructor(private readonly processor: Processor<any,any>) { }

    async run(context: Context): Promise<any> {
        return await this.processor.process(context, context)
    }
}

