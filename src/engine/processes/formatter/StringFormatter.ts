import {Formatter} from "./Formatter";

export class StringFormatter extends Formatter {
    protected async format(entry: string): Promise<string> {
        return entry;
    }

}