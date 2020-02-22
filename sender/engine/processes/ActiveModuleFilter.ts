import {Process} from "./Process";
import {Record} from "../../models/Record";

export class ActiveModuleFilter extends Process<Record, Record> {

    async receive(record: Record): Promise<Record> {
        record.modules = record.modules.filter(bm => record.user.hasActiveModule(bm.module.id))
            .map(bm => {
                bm.activeModule = record.user.getActiveModule(bm.module.id);
                return bm;
            });
        return record;
    }

}