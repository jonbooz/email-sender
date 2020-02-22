export class ModuleEntry {
    heading: string;
    entry: string;
    format: string; // TODO make enum

    constructor(heading: string, entry: string, format: string) {
        this.heading = heading;
        this.entry = entry;
        this.format = format;
    }
}
