import { Formatter } from './Formatter'

export class TextFormatter implements Formatter {

    async format(entry: string): Promise<string> {
        return entry;
    }
}
