import { Context } from "../../models/Context";
import { Module } from "../../models/Module";
import { Processor } from "./Processor";

export class ModuleContextAppender implements Processor<Array<Module>, Array<Module>> {

    async process(modules: Array<Module>, context: Context): Promise<Array<Module>> {
        context.modules = modules;
        return modules;
    }

}
