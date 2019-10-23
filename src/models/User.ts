'use strict';

import { Dictionary, fromPairs } from 'lodash';

import { ActiveModule } from './ActiveModule';

export class User {
    name: string;
    email: string;
    activeModules: Array<ActiveModule>;
    private readonly _activeModuleSet: Dictionary<ActiveModule>;

    constructor(user: object) {
        this.name = user['name'];
        this.email = user['email'];
        this.activeModules = user['activeModules'].map((m) => new ActiveModule((m)));
        this._activeModuleSet = fromPairs(this.activeModules.map((am => [am.name, am])));
    }

    getActiveModule(id: string): ActiveModule {
        return this._activeModuleSet[id];
    }

    hasActiveModule(id: string): boolean {
        return this._activeModuleSet.hasOwnProperty(id);
    }

    getDataForSaving(): Dictionary<any> {
        return {
            name: this.name,
            email: this.email,
            activeModules: this.activeModules
        }
    }

}
