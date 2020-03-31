import {BoundModule} from "../../models/BoundModule";
import {Process} from "./Process";
import {ModuleEntry} from "../../models/ModuleEntry";

export class ResolveCurrentEntry extends Process<BoundModule, BoundModule> {

    protected async receive(msg: BoundModule): Promise<BoundModule> {
        const status = msg.activeModule;
        msg.moduleEntry = new ModuleEntry(msg.module.heading, msg.module.entries[status.index], msg.module.format);
        return msg;
    }

}