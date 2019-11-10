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
            if (activeModule.repeats < 0) {
                continue;
            }

            if (activeModule.times < activeModule.repeats) {
                activeModule.times += 1;
            } else {
                const mod = msg.getModule(activeModule.name);
                let newIndex = activeModule.index + 1;
                if (newIndex >= mod.module.entries.length) {
                    newIndex = 0;
                }
                activeModule.index = newIndex;
                activeModule.times = 0;
            }
        }
        return this._env.getDataStore().saveUser(user)
            .then(() => msg);
    }

}