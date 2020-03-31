
export class Module {
    id: string;
    heading: string;
    entries: Array<string>;
    format: string; // TODO this should be an enum

    constructor(mod: object) {
        this.id = mod['id'];
        this.heading = mod['heading'];
        this.entries = mod['entries'];
        if (mod['format'] == null) {
            this.format = 'text';
        } else {
            this.format = mod['format'];
        }
    }
}
