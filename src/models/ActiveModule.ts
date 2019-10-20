export class ActiveModule {
    name: string;
    repeats: number;
    index: number;
    times: number;

    constructor(module: object) {
        this.name = module['name'];
        this.repeats = module['repeats'];
        this.index = module['index'];
        this.times = module['times'];
    }
}
