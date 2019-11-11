import {Process} from "./Process";

/**
 * Begins executing an in-order series of processes against
 * the given message, using the response of one process as
 * the message sent to the following process. The result will
 * be the response from the last process.
 */
export class InOrderProcess<T> extends Process<T, T> {

    private readonly _processes: Array<Process<T, T>>;

    constructor(processes: Array<Process<T,T>>) {
        super();
        if (processes.length < 1) {
            throw new Error('IllegalState');
        } else {
            this._processes = processes;
        }

    }

    protected receive(msg: T): Promise<T> {
        let last = this._processes[0].send(msg);
        for (let i = 1; i < this._processes.length; ++i) {
            last = last.then(m => this._processes[i].send(m));
        }
        return last;
    }

}