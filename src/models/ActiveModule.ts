export enum Include {
    Always = "always",
    Limit = "limit"
}

/**
 * A Module that is active for a given User.
 *
 * This model should always be bound to a specific user.
 */
export class ActiveModule {
    /**
     * A reference to a Module.id
     */
    name: string;

    /**
     * The Module.entries index for the next entry to send out.
     */
    index: number;

    /**
     * The rate at which this Module should be included.
     *
     * Defaults to Include.Always.
     */
    include: Include;

    constructor(module: object) {
        this.name = module['name'];
        this.index = module['index'];

        if (module.hasOwnProperty('include')) {
            this.include = module['include'];
        } else {
            this.include = Include.Always;
        }
    }

}
