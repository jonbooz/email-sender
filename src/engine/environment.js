'use strict';

const AwsUtils = require('aws-utils');
const DataStore = require('../services/DataStore.js');

module.exports = class Environment {
    constructor() {
    }

    getAws() {
        if (typeof this.aws === 'undefined') {
            this.aws = new AwsUtils();
        }
        return this.aws;
    }

    /**
     * @returns {DataStore}
     */
    getDataStore() {
        if (typeof this.dataStore === 'undefined') {
            const aws = this.getAws();
            this.dataStore = new DataStore(aws);
        }
        return this.dataStore; 
    }

    getLogLevel() {
        return 'debug';
    }

    getLogger() {
        return console;
    }
}