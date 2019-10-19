'use strict';

module.exports = class ActiveModule {
    constructor(module) {
        this.name = module.name;
        this.repeats = module.repeats;
        this.index = module.index;
        this.times = module.times;
    }
};