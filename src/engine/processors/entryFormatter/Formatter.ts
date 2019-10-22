export interface Formatter {
    format(entry: string): Promise<string>;
}