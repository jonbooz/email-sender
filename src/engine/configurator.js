'use strict';

const Engine = require('./engine.js');
const Environment = require('./environment.js');

////
// Processors
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

module.exports = class Configurator {
    /**
     * 
     * @param {Environment} environment 
     */
    constructor(environment) {
        this.env = environment;

        this.formatters = {
            text: new TextFormatter(),
            imageBlob: new ImageBlobFormatter(this.env.getAws())
        };

        this.processors = [
            new ModuleRetriever(this.env.getDataStore()),
            new ModuleContextAppender(),
            new ModuleSortingProcessor(),
            new ModuleProcessor(),
            new EntryProcessor(this.formatters),
            new EmailProcessor(),
            new EmailSender(this.env.getAws()),
            new UserUpdateProcessor(this.env.getDataStore())
        ];
    }

    buildEngine() {
        return new Engine(this.processors);
    }
};