import {Process} from "./Process";
import {Environment} from "../environment";
import {Dictionary, fromPairs} from 'lodash';
import {Module} from "../../models/Module";

/**
 * Gets all possible module records for a given user and
 * binds them to the message Record.
 *
 * Note that this does not filter the modules for any active
 * modules that the user is currently using.
 *
 * TODO add support for global modules by splitting user-specific
 *  and global modules getters into separate child processes.
 */
export class GetModules extends Process<string, Array<Module>> {
    constructor(private readonly _env: Environment) {
        super();
    }

    receive(username: string): Promise<Array<Module>> {
        return this._env.getDataStore().getModules(username);
    }
}