import {Process} from "./Process";
import {Dictionary} from 'lodash';
import { BoundModule } from "../../models/BoundModule";

export class ModuleProcessor extends Process<BoundModule, BoundModule> {

    constructor(private readonly _processors: Dictionary<Process<BoundModule, BoundModule>>) {
        super();
    }

    protected receive(msg: BoundModule): Promise<BoundModule> {
        const type = msg.module.type;
        const processor = this.getProcessor(type);
        return processor.send(msg);
    }

    private getProcessor(type: string): Process<BoundModule, BoundModule> {
        if (this._processors.hasOwnProperty(type)) {
            return this._processors[type];
        } else {
            throw Error('MissingProcessor:' + type);
        }
    }

}