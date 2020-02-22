
import { LogLevel, Logger } from './Logger';

export class ConsoleLogger extends Logger {

    constructor(logLevel: LogLevel) {
        super(logLevel);
    }

    log(message: any): void {
        console.log(message);
    }
}
