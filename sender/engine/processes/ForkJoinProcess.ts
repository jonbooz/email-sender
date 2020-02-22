import {Process} from "./Process";

const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * Run the given child process concurrently for all elements in
 * the message.
 *
 * This implementation will ignore any element whose execution
 * throws an exception and return those that succeed.
 *
 * TODO handle logging for failed elements?
 */
export class ForkJoinProcess<T> extends Process<Array<T>, Array<T>> {

    constructor(private readonly _childProcess: Process<T, T>) {
        super();
    }

    protected receive(msg: Array<T>): Promise<Array<T>> {
        const forked = msg.map(m => this._childProcess.unsafeSend(m));

        // TODO once on 12.9.0 can use Promise.allSettled() instead
        return this.allSettled(forked)
            .then((promises => promises.filter(p => p.status === FULFILLED)))
            .then((promises => promises.map(p => p['value'])));
    }

    private allSettled(promises: Array<Promise<T>>) {
        const wrappedPromises = promises.map(p => Promise.resolve(p)
            .then(
                val => ({ status: FULFILLED, value: val}),
                err => ({ status: REJECTED, reason: err})));
        return Promise.all(wrappedPromises);
    }

}