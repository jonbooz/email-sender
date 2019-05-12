'use strict';

const Module = require('./Module.js');
const User = require('./User.js');

module.exports = class Context {
    constructor() {

    }

    /**
     * 
     * @param {User} user 
     */
    setUser(user) {
        this._user = user;
    }

    /**
     * @returns {User}
     */
    getUser() {
        return this._user;
    }

    /**
     * 
     * @param {Module} modules 
     */
    setModules(modules) {
        this._modules = modules;
    }

    /**
     * @returns {Module}
     */
    getModules() {
        return this._modules;
    }

    getModule(id) {
        for (let i in this._modules) {
            if (id === this._modules[i].id) {
                return this._modules[i];
            }
        }
        return null;
    }

    setLogLevel(logLevel) {
        this._logLevel = logLevel;
    }

    getLogLevel() {
        return this._logLevel;
    }

    setLogger(logger) {
        this._logger = logger;
    }

    getLogger() {
        return this._logger;
    }
};