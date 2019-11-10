import {Process} from "./Process";
import {Record} from "../../models/Record";

export class SortModules extends Process<Record, Record> {

    protected async receive(msg: Record): Promise<Record> {
        const sortedModules = [ ];
        for (let activeModule of msg.user.activeModules) {
            sortedModules.push(msg.getModule(activeModule.name));
        }
        msg.modules = sortedModules;
        return msg;
    }


}