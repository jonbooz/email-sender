'use strict';

const Context = require('../../models/Context.js');
const ModuleEntry = require('../../models/ModuleEntry.js');

/**
 * This processor takes a list of ModuleEntries and formats
 * the entry contents based on the entry format.
 * 
 * If a format isn't supported the entry is removed from
 * the list.
 */
module.exports = class EntryProcessor {

    constructor(formatters) {
        this._formatters = formatters;
    }

    /**
     * 
     * @param {[MobuleEntry]} entries 
     * @param {Context} context 
     */
    async process(entries, context) {
        const formattedEntries = [ ];
        for (let i in entries) {
            let entry = entries[i];
            let formatter = this._formatters[entry.format];
            if (formatter === undefined) {
                continue;
            } else {
                entry.entry = formatter.format(entry.entry);
                formattedEntries.push(entry);
            }
        }
        for (let i in formattedEntries) {
            let entry = entries[i];
            entry.entry = await entry.entry;
        }
        return formattedEntries;
    }
};