import {BoundModule} from "../../models/BoundModule";
import {Process} from "./Process";
import {Dictionary} from 'lodash';
import {Formatter} from "./formatter/Formatter";
import {FormatEntryHtml} from "./formatter/FormatEntryHtml";

export class FormatEntry extends Process<BoundModule, BoundModule> {

    private readonly formatEntryHtml = new FormatEntryHtml();

    constructor(private readonly _formatters: Dictionary<Formatter>) {
        super();
    }

    protected receive(msg: BoundModule): Promise<BoundModule> {
        const format = msg.moduleEntry.format;
        const formatter = this.getFormatter(format);
        return formatter.send(msg)
            .then(m => this.formatEntryHtml.send(m));
    }

    private getFormatter(format: string): Formatter {
        if (this._formatters.hasOwnProperty(format)) {
            return this._formatters[format];
        } else {
            throw Error('MissingFormatter:'+format);
        }
    }

}