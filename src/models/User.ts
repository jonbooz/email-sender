'use strict';

import { Dictionary, fromPairs } from 'lodash';

import { ActiveModule } from './ActiveModule';

const DEFAULT_EMAIL_SUBJECT = 'Daily Reminders';

/**
 * A representation of a User and its data.
 */
export class User {
    /**
     * The User's username.
     */
    name: string;

    /**
     * The User's email that all emails are sent to.
     */
    email: string;

    /**
     * An ordered list of Modules, whoses entries the User should be sent.
     */
    activeModules: Array<ActiveModule>;
    private readonly _activeModuleSet: Dictionary<ActiveModule>;

    /**
     * The total number of limited Modules that can be included in one
     * email.
     */
    maxLimitedModules: number;

    /**
     * The index for the next limited Module to include.
     *
     * This is indexed by the Module.id of the limited Module.
     */
    limitedModuleIndex: string;

    /**
     * The subject to send.
     */
    emailSubject: string;

    constructor(user: object) {
        this.name = user['name'];
        this.email = user['email'];
        this.activeModules = user['activeModules'].map((m) => new ActiveModule((m)));
        this._activeModuleSet = fromPairs(this.activeModules.map((am => [am.name, am])));
        if (user.hasOwnProperty('maxLimitedModules') && user['maxLimitedModules'] >= 1) {
            this.maxLimitedModules = user['maxLimitedModules'];
        } else {
            this.maxLimitedModules = 1;
        }
        if (user.hasOwnProperty('limitedModuleIndex')) {
            this.limitedModuleIndex = user['limitedModuleIndex'];
        }
        if (user.hasOwnProperty('emailSubject')) {
            this.emailSubject = user['emailSubject'];
        } else {
            this.emailSubject = DEFAULT_EMAIL_SUBJECT;
        }
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
            activeModules: this.activeModules,
            limitedModuleIndex: this.limitedModuleIndex,
            maxLimitedModules: this.maxLimitedModules
        }
    }

}
