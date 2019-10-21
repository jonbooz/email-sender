
import {LogLevel} from "./LogLevel";

export abstract class Logger {
    private readonly level: LogLevel;

    protected constructor(logLevel: LogLevel) {
        this.level = logLevel;
    }

    abstract log(message: any): void;

    error(message: any, er?: Error): void {
        if (this.canLog(LogLevel.Error)) {
            this.log(message);
            if (er != null) {
                this.log(er);
            }
        }
    }

    info(message: any): void {
        if (this.canLog(LogLevel.Info)) {
            this.log(message);
        }
    }

    debug(message: any): void {
        if (this.canLog(LogLevel.Debug)) {
            this.log(message);
        }
    }

    trace(message: any): void {
        if (this.canLog(LogLevel.Trace)) {
            this.log(message);
        }
    }

    private canLog(methodLevel: LogLevel) {
        return methodLevel >= this.level;
    }
}

export { LogLevel }