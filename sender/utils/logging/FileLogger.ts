
import { LogLevel, Logger } from './Logger';

import * as fs from 'fs';

export class FileLogger extends Logger {
    private readonly filePath: string;

    constructor(level, filePath) {
        super(level);
        if (level > LogLevel.Debug) {
            throw Error("Do not use File Logging in a production system.");
        }
        this.filePath = filePath;
    }

    log(message: any): void {
        if (typeof message === 'object') {
            message = JSON.stringify(message, null, 2);
        }
        fs.appendFileSync(this.filePath, message + '\n');
    }
}
