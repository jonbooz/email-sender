import { Context } from '../../models/Context'

export interface Processor<I, R> {

    process(input: I, context: Context): Promise<R>;
}