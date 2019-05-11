'use strict';

module.exports = class ActiveModule {
    constructor(module) {
        this.name = module.name;
        this.repeats = module.repeats;
        this.index = module.index;
        this.times = module.times;
    }

    asJson() {
        return {
            name: this.name,
            repeats: this.repeats,
            index: this.index,
            times: this.times
        };
    }
}