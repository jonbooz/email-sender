'use strict';

import { Logger } from '../utils/logging/Logger';
import { Module } from './Module';
import { User } from './User';

export class Context {
    private _user: User;
    private _modules: Array<Module>;
    private _logger: Logger;

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    get modules(): Array<Module> {
        return this._modules;
    }

    set modules(modules: Array<Module>) {
        this._modules = modules;
    }

    get logger(): Logger {
        return this._logger;
    }

    set logger(logger: Logger) {
        this._logger = logger;
    }

    getModule(id): Module {
        for (let mod of this._modules) {
            if (mod.id === id) {
                return mod;
            }
        }
        return null;
    }

}

