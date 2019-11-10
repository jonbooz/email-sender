import {Process} from "./Process";
import {Record} from "../../models/Record";
import {ForkJoinProcess} from "./ForkJoinProcess";
import {BoundModule} from "../../models/BoundModule";

export class HandleModules extends Process<Record, Record> {

    private readonly _forkJoin: ForkJoinProcess<BoundModule>;

    constructor(childProcess: Process<BoundModule, BoundModule>) {
        super();
        this._forkJoin = new ForkJoinProcess<BoundModule>(childProcess);
    }

    protected receive(msg: Record): Promise<Record> {
        return this._forkJoin.send(msg.modules)
            .then(mods => {
                msg.modules = mods;
                return msg;
            });
    }

}