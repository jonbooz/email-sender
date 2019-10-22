import { Context } from "../../models/Context";
import { Module } from "../../models/Module";
import { Processor } from "./Processor";

/**
 * This processor sorts the modules returned for a user based on that user's
 * list of active modules.
 */
export class ModuleSortingProcessor implements Processor<Array<Module>, Array<Module>> {
    async process(modules: Array<Module>, context: Context): Promise<Array<Module>> {
        const user = context.user;
        const modulesByName = { };
        for (let module of modules) {
            modulesByName[module.id] = module;
        }
        const sortedModules = [ ];
        for (let activeModules of user.activeModules) {
            sortedModules.push(modulesByName[activeModules.name]);
        }

        return sortedModules;
    }
}
