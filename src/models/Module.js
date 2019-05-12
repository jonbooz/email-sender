'use strict';

module.exports = class Module {
    constructor(mod) {
        this.id = mod.id;
        this.heading = mod.heading;
        if (typeof mod.entries === 'string') {
            this.entries = JSON.parse(mod.entries);
        } else {
            // entries should just be a list of strings...
            this.entries = mod.entries;
        }
        this.format = 'text'; // TODO support markdown
    }

    asJson() {
        return {
            id: this.id,
            heading: this.heading,
            entries: JSON.stringify(this.entries)
        };
    }
};