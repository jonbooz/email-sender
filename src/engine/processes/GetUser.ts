import {Process} from "./Process";
import {Environment} from "../environment";
import {User} from "../../models/User";

/**
 * Gets a user record for the given username.
 */
export class GetUser extends Process<string, User> {

    constructor(private readonly _env: Environment) {
        super();
    }

    protected receive(username: string): Promise<User> {
        return this._env.getDataStore().getUser(username);
    }

}