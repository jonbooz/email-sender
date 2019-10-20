'use strict';

import { Module } from './Module';
import { User } from './User';

export class Context {
    user: User;
    modules: Array<Module>;
    logLevel: string; // TODO make enum; and this can be hidden behind logger
    logger: any;

    /** @deprecated */
    setUser(user: User) {
        this.user = user;
    }

    /** @deprecated */
    getUser(): User {
        return this.user;
    }

    /** @deprecated */
    setModules(modules: Array<Module>) {
        this.modules = modules;
    }

    /** @deprecated */
    getModules(): Array<Module> {
        return this.modules;
    }

    /** @deprecated */
    getModule(id): Module {
        for (let mod of this.modules) {
            if (mod.id === id) {
                return mod;
            }
        }
        return null;
    }

    /** @deprecated */
    setLogLevel(logLevel: string) {
        this.logLevel = logLevel;
    }

    /** @deprecated */
    getLogLevel(): string {
        return this.logLevel
    }

    /** @deprecated */
    setLogger(logger: any) {
        this.logger = logger;
    }

    /** @deprecated */
    getLogger(): any {
        return this.logger;
    }
}

