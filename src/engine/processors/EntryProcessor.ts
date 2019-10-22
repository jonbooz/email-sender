import { Context } from '../../models/Context';
import { ModuleEntry } from "../../models/ModuleEntry";
import { Processor } from "./Processor";
import { Formatter } from "./entryFormatter/Formatter";
import { Dictionary } from 'lodash'

/**
 * This processor takes a list of ModuleEntries and formats
 * the entry contents based on the entry format.
 * 
 * If a format isn't supported the entry is removed from
 * the list.
 */
export class EntryProcessor implements Processor<Array<ModuleEntry>, Array<ModuleEntry>> {
    private readonly _formatters: Dictionary<Formatter>;

    constructor(formatters: Dictionary<Formatter>) {
        this._formatters = formatters;
    }

    async process(entries: Array<ModuleEntry>, context: Context): Promise<Array<ModuleEntry>> {
        const formattedEntryPromises: Array<{entry: ModuleEntry, formatPromise: Promise<string>}> = [ ];

        for (let entry of entries) {
            let formatter = this._formatters[entry.format];
            if (formatter !== undefined) {
                formattedEntryPromises.push({
                    entry: entry,
                    formatPromise: formatter.format(entry.entry)
                })
            }
        }

        const formattedEntries: Array<ModuleEntry> = [ ];
        for (let promisePair of formattedEntryPromises) {
            promisePair.entry.entry = await promisePair.formatPromise;
            formattedEntries.push(promisePair.entry);
        }
        return formattedEntries;
    }

}
