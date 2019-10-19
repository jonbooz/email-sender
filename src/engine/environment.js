'use strict';

const AwsUtils = require('aws-utils');
const DataStore = require('../services/DataStore.js');
const Engine = require('./engine.js');

////
// Processors
const MultiProcessor = require('./processors/MultiProcessor.js');
const ModuleRetriever = require('./processors/ModuleRetriever.js');
const ModuleContextAppender = require('./processors/ModuleContextAppender.js');
const ModuleSortingProcessor = require('./processors/ModuleSortingProcessor.js');
const ModuleProcessor = require('./processors/ModuleProcessor.js');
const EntryProcessor = require('./processors/EntryProcessor.js');
const EmailProcessor = require('./processors/EmailProcessor.js');
const EmailSender = require('./processors/EmailSender.js');
const UserUpdateProcessor = require('./processors/UserUpdateProcessor.js');

////
// Formatters
const TextFormatter = require('./processors/entryFormatter/TextFormatter.js');
const ImageBlobFormatter = require('./processors/entryFormatter/ImageBlobFormatter.js');

module.exports = class Environment {
    constructor() {
    }

    /**
     * @returns {AwsUtils}
     */
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

    /**
     * @returns {string}
     */
    getLogLevel() {
        return 'error';
    }

    /**
     * @returns {object} that accepts `log`
     */
    getLogger() {
        return console;
    }

    getFormatters() {
        if (typeof this.formatters === 'undefined') {
            this.formatters = {
                text: new TextFormatter(),
                imageBlob: new ImageBlobFormatter(this.getAws())
            };
        }
        return this.formatters;
    }

    getProcessors() {
        if (typeof this.processors === 'undefined') {
            this.processors = [
                new ModuleRetriever(this.getDataStore()),
                new ModuleContextAppender(),
                new ModuleSortingProcessor(),
                new ModuleProcessor(),
                new EntryProcessor(this.getFormatters()),
                new EmailProcessor(),
                new EmailSender(this.getAws()),
                new UserUpdateProcessor(this.getDataStore())
            ];
        }
        return this.processors;
    }

    getEngine() {
        if (typeof this.engine === 'undefined') {
            let multiProcessor = new MultiProcessor(this.getProcessors());
            this.engine = new Engine(multiProcessor);
        }
        return this.engine;
    }
};