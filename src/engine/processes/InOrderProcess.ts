import {Process} from "./Process";

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