'use strict';

import * as AwsUtils from "aws-utils";
import {DataStore} from "../services/DataStore";
import {ConsoleLogger} from "../utils/logging/ConsoleLogger";
import {Logger, LogLevel} from "../utils/logging/Logger";
import {Record} from "../models/Record";
import {BoundModule} from "../models/BoundModule";

////
// Processes
import {GetAndBindData} from "./processes/GetAndBindData";
import {HandleModules} from "./processes/HandleModules";
import {ActiveModuleFilter} from "./processes/ActiveModuleFilter";
import {ResolveCurrentEntry} from "./processes/ResolveCurrentEntry";
import {FormatEntry} from "./processes/FormatEntry";
import {FormatEmailHtml} from "./processes/formatter/FormatEmailHtml";
import {SendEmail} from "./processes/SendEmail";
import {SortModules} from "./processes/SortModules";
import {UpdateUser} from "./processes/UpdateUser";
import {StringFormatter} from "./processes/formatter/StringFormatter";
import {InOrderProcess} from "./processes/InOrderProcess";
import {ResolveLimitedModules} from "./processes/ResolveLimitedModules";
import { ModuleProcessor } from "./processes/ModuleProcessor";
import { GenTwentyRecentPosts } from "./processes/GenTwentyRecentPosts";

export class Environment {
    private aws: AwsUtils;
    private dataStore: DataStore;
    private logger: Logger;
    private process: InOrderProcess<Record>;

    getAws(): AwsUtils {
        return this.bean('aws', () => new AwsUtils());
    }

    getDataStore(): DataStore {
        return this.bean('dataStore', () => new DataStore((this.getAws())));
    }

    getLogger(): Logger {
        return this.bean('logger', () => new ConsoleLogger(LogLevel.Error));
    }

    getProcess() {
        return this.bean('process', () => {
            return new InOrderProcess<Record>([
                new GetAndBindData(this),
                new ActiveModuleFilter(),
                new ResolveLimitedModules(),
                new HandleModules(new ModuleProcessor({
                    'entries': new InOrderProcess<BoundModule>([
                                    new ResolveCurrentEntry(),
                                    new FormatEntry({
                                        'text': new StringFormatter()
                                    })
                                ]),
                    'g20-posts': new GenTwentyRecentPosts(10)
                })),
                new SortModules(),
                new FormatEmailHtml(),
                new SendEmail(this.getAws()),
                new UpdateUser(this)
            ]);
        })
    }

    private bean<T>(beanName, generator: () => T): T {
        if (typeof this[beanName] === 'undefined') {
            this[beanName] = generator();
        }
        return this[beanName];
    }
}

