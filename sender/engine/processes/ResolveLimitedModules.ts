import {Process} from "./Process";
import {Record} from "../../models/Record";
import {Include} from "../../models/ActiveModule";

export class ResolveLimitedModules extends Process<Record, Record> {

    async receive(record: Record): Promise<Record> {
        let limitedModuleIds = ResolveLimitedModules.getUsersLimitedModuleIds(record);
        limitedModuleIds = ResolveLimitedModules.resolveLimitedModuleIds(record, limitedModuleIds);

        record.user.limitedModuleIndex = limitedModuleIds[limitedModuleIds.length-1];

        record.modules = record.modules.filter(bm => {
            if (bm.activeModule.include === Include.Limit) {
                // @ts-ignore
                return limitedModuleIds.includes(bm.module.id)
            } else {
                return true;
            }
        });

        return record;
    }

    private static getUsersLimitedModuleIds(record: Record) {
        return record.user.activeModules.filter(am => am.include === Include.Limit)
            .map(am => am.name)
            .sort();
    }

    private static resolveLimitedModuleIds(record: Record, limitedModuleIds: string[]) {
        let index = ResolveLimitedModules.getIndexForNextModule(record, limitedModuleIds);
        return limitedModuleIds.slice(index)
            .concat(limitedModuleIds.slice(0, index))
            .slice(0, record.user.maxLimitedModules);

    }

    private static getIndexForNextModule(record: Record, limitedModuleIds: string[]) {
        let index = limitedModuleIds.indexOf(record.user.limitedModuleIndex);
        if (index < 0) {
            index = 0;
        } else if (index + 1 === limitedModuleIds.length) {
            index = 0;
        } else {
            index += 1;
        }
        return index;
    }
}