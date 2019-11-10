'use strict';

import * as AwsUtils from "aws-utils";
import {DataStore} from "../services/DataStore";
import {ConsoleLogger} from "../utils/logging/ConsoleLogger";
import {Logger, LogLevel} from "../utils/logging/Logger";
import { Dictionary } from "lodash";
import {EmailSenderEngine} from "./engine";
import {Record} from "../models/Record";
import {BoundModule} from "../models/BoundModule";

////
// Processors
import {Processor} from "./processors/Processor";
import {ModuleRetriever} from "./processors/ModuleRetriever";
import {ModuleContextAppender} from "./processors/ModuleContextAppender";
import {ModuleSortingProcessor} from "./processors/ModuleSortingProcessor";
import {ModuleProcessor} from "./processors/ModuleProcessor";
import {EntryProcessor} from "./processors/EntryProcessor";
import {EmailProcessor} from "./processors/EmailProcessor";
import {EmailSender} from "./processors/EmailSender";
import {UserUpdateProcessor} from "./processors/UserUpdateProcessor";

////
// Formatters
import {Formatter} from "./processors/entryFormatter/Formatter";
import {TextFormatter} from "./processors/entryFormatter/TextFormatter";
import {ImageBlobFormatter} from "./processors/entryFormatter/ImageBlobFormatter";
import {MultiProcessor} from "./processors/MultiProcessor";
import {InOrderProcess} from "./processes/InOrderProcess";

////
// Processes
import {GetAndBindData} from "./processes/GetAndBindData";
import {ForkJoinProcess} from "./processes/ForkJoinProcess";
import {HandleModules} from "./processes/HandleModules";
import {ActiveModuleFilter} from "./processes/ActiveModuleFilter";
import {ResolveCurrentEntry} from "./processes/ResolveCurrentEntry";
import {FormatEntry} from "./processes/FormatEntry";
import {FormatEmailHtml} from "./processes/formatter/FormatEmailHtml";
import {SendEmail} from "./processes/SendEmail";
import {SortModules} from "./processes/SortModules";
import {UpdateUser} from "./processes/UpdateUser";
import {StringFormatter} from "./processes/formatter/StringFormatter";

export class Environment {
    private aws: AwsUtils;
    private dataStore: DataStore;
    private logger: Logger;
    private formatters: Dictionary<Formatter>;
    private processors: Array<Processor<any,any>>;
    private process: InOrderProcess<Record>;
    private engine: EmailSenderEngine;

    getAws(): AwsUtils {
        return this.bean('aws', () => new AwsUtils());
    }

    getDataStore(): DataStore {
        return this.bean('dataStore', () => new DataStore((this.getAws())));
    }

    getLogger(): Logger {
        return this.bean('logger', () => new ConsoleLogger(LogLevel.Error));
    }

    getFormatters(): Dictionary<Formatter> {
        return this.bean('formatters', () => Object.create({
            text: new TextFormatter(),
            imageBlob: new ImageBlobFormatter(this.getAws())
        }));
    }

    getProcessors() {
        return this.bean('processors', () => [
            new ModuleRetriever(this.getDataStore()),
            new ModuleContextAppender(),
            new ModuleSortingProcessor(),
            new ModuleProcessor(),
            new EntryProcessor(this.getFormatters()),
            new EmailProcessor(),
            new EmailSender(this.getAws()),
            new UserUpdateProcessor(this.getDataStore())
        ]);
    }

    getProcess() {
        return this.bean('process', () => {
            return new InOrderProcess<Record>([
                new GetAndBindData(this),
                new ActiveModuleFilter(),
                new HandleModules(new InOrderProcess<BoundModule>([
                    new ResolveCurrentEntry(),
                    new FormatEntry({
                        'text': new StringFormatter()
                    })
                ])),
                new SortModules(),
                new FormatEmailHtml(),
                new SendEmail(this.getAws()),
                new UpdateUser(this)
            ]);
        })
    }

    getEngine() {
        return this.bean('engine', () => {
            let multiProcessor = new MultiProcessor(this.getProcessors());
            return new EmailSenderEngine(multiProcessor);
        });
    }

    private bean<T>(beanName, generator: () => T): T {
        if (typeof this[beanName] === 'undefined') {
            this[beanName] = generator();
        }
        return this[beanName];
    }
}

