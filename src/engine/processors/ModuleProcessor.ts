import { Context } from '../../models/Context'
import { Module } from '../../models/Module'
import { ModuleEntry } from "../../models/ModuleEntry";
import { Processor } from "./Processor";

export class ModuleProcessor implements Processor<Array<Module>, Array<ModuleEntry>> {

    async process(modules: Array<Module>, context: Context): Promise<Array<ModuleEntry>> {
        const user = context.user;
        const entries = [ ];
        for (let i in modules) {
            const module = modules[i];
            const status = user.getActiveModule(module.id);
            entries.push(new ModuleEntry(module.heading, module.entries[status.index], module.format));
        }
        return entries;
    }

}
