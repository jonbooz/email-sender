
const DEFAULT_FORMAT = 'text';
const DEFAULT_TYPE = 'entries';

export class Module {
    id: string;
    heading: string;
    entries: Array<string>;
    format: string;
    type: string;

    constructor(mod: object) {
        this.id = mod['id'];
        this.heading = mod['heading'];
        this.entries = mod['entries'];
        if (mod['format'] == null) {
            this.format = DEFAULT_FORMAT;
        } else {
            this.format = mod['format'];
        }
        if (mod['type'] == null) {
            this.type = DEFAULT_TYPE;
        } else {
            this.type = mod['type'];
        }
    }
}
