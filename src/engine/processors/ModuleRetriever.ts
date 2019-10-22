import { DataStore } from "../../services/DataStore";
import { Context } from "../../models/Context";
import { Processor } from "./Processor";
import {Module} from "../../models/Module";

/**
 * This takes the user from the context and retrieves that
 * user's active Modules.
 */
export class ModuleRetriever implements Processor<any, Array<Module>> {
    constructor(private readonly _dataStore: DataStore) { }

    async process(input: any, context: Context): Promise<Array<Module>> {
        const user = context.user;
        return await this._dataStore.getModules(user.name)
            .then(data => data.filter((x) => user.hasActiveModule(x.id)));

        // TODO add support for global modules
    }


}
