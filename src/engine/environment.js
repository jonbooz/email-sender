'use strict';

const AwsUtils = require('aws-utils');
const DataStore = require('../services/DataStore.js').DataStore;
const Engine = require('./engine.js');
const ConsoleLogger = require('../utils/logging/ConsoleLogger.js').ConsoleLogger;
const LogLevel = require('../utils/logging/Logger.js').LogLevel;

////
// Processors
const MultiProcessor = require('./processors/MultiProcessor.js').MultiProcessor;
const ModuleRetriever = require('./processors/ModuleRetriever.js').ModuleRetriever;
const ModuleContextAppender = require('./processors/ModuleContextAppender.js').ModuleContextAppender;
const ModuleSortingProcessor = require('./processors/ModuleSortingProcessor.js').ModuleSortingProcessor;
const ModuleProcessor = require('./processors/ModuleProcessor.js').ModuleProcessor;
const EntryProcessor = require('./processors/EntryProcessor.js').EntryProcessor;
const EmailProcessor = require('./processors/EmailProcessor.js').EmailProcessor;
const EmailSender = require('./processors/EmailSender.js').EmailSender;
const UserUpdateProcessor = require('./processors/UserUpdateProcessor.js').UserUpdateProcessor;

////
// Formatters
const TextFormatter = require('./processors/entryFormatter/TextFormatter.js').TextFormatter;
const ImageBlobFormatter = require('./processors/entryFormatter/ImageBlobFormatter.js').ImageBlobFormatter;

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
     * @returns {object} that accepts `log`
     */
    getLogger() {
        return new ConsoleLogger(LogLevel.Error);
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