'use strict';

const _ = require('lodash');

const ActiveModule = require('./ActiveModule.js');

module.exports = class User {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        if (typeof user.activeModules === 'string') {
            this.activeModules = JSON.parse(user.activeModules)
                    .map((m) => new ActiveModule(m));
        } else {
            this.activeModules = user.activeModules.map((m) => new ActiveModule(m));
        }
    }

    /**
     * 
     * @param {ActiveModule} id 
     */
    getActiveModule(id) {
        if (typeof this._activeModuleSet === 'undefined') {
            this._buildActiveModuleSet();
        }
        return this._activeModuleSet[id];
    }

    hasActiveModule(id) {
        if (typeof this._activeModuleSet === 'undefined') {
            this._buildActiveModuleSet();
        }
        return this._activeModuleSet.hasOwnProperty(id);
    }

    _buildActiveModuleSet() {
        this._activeModuleSet = _.fromPairs(this.activeModules.map((am) => [am.name, am]));
    }

};