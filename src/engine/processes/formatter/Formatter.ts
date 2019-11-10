import {Process} from "../Process";
import {BoundModule} from "../../../models/BoundModule";

export abstract class Formatter extends Process<BoundModule, BoundModule> {

    protected receive(msg: BoundModule): Promise<BoundModule> {
        return this.format(msg.moduleEntry.entry)
            .then(formatted => {
                msg.email = formatted;
                return msg;
            });
    }

    protected abstract format(entry: string): Promise<string>;
}