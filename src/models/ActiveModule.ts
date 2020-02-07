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

    constructor(module: object) {
        this.name = module['name'];
        this.index = module['index'];
    }
}
