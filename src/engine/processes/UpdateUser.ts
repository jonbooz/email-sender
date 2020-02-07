import {Process} from "./Process";
import {Record} from "../../models/Record";
import {Environment} from "../environment";

export class UpdateUser extends Process<Record, Record> {
    constructor(private readonly _env: Environment) {
        super();
    }

    protected receive(msg: Record): Promise<Record> {
        const user = msg.user;
        for (let activeModule of user.activeModules) {
            const mod = msg.getModule(activeModule.name);
            let newIndex = activeModule.index + 1;
            if (newIndex >= mod.module.entries.length) {
                newIndex = 0;
            }
            activeModule.index = newIndex;
        }
        return this._env.getDataStore().saveUser(user)
            .then(() => msg);
    }

}