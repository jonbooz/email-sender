import {Context} from "../../models/Context";
import {DataStore} from "../../services/DataStore";
import {Processor} from "./Processor";
import {User} from "../../models/User";

/**
 * This processor updates the user's active module
 * records after having sent the user a new email.
 */
export class UserUpdateProcessor implements Processor<any, User> {

    constructor(private readonly _dataStore: DataStore) { }

    async process(input: any, context: Context): Promise<User> {
        const user = context.user;
        for (let activeModule of user.activeModules) {
            if (activeModule.repeats < 0) {
                continue;
            }

            if (activeModule.times < activeModule.repeats) {
                activeModule.times += 1;
            } else {
                let mod = context.getModule(activeModule.name);
                let newIndex = activeModule.index + 1;
                if (newIndex >= mod.entries.length) {
                    newIndex = 0;
                }
                activeModule.index = newIndex;
                activeModule.times = 0;
            }
        }
        await this._dataStore.saveUser(user);
        return user;
    }

}
