import {Process} from "./Process";
import {GetUser} from "./GetUser";
import {GetModules} from "./GetModules";
import {Environment} from "../environment";
import {Record} from "../../models/Record";
import {Module} from "../../models/Module";
import {BoundModule} from "../../models/BoundModule";
import {User} from "../../models/User";

/**
 * Gets all data required, based only on the current request's
 * username and binds it to the record.
 *
 * On failure, no requests can proceed further and the error will
 * propagate out.
 */
export class GetAndBindData extends Process<Record, Record> {
    private readonly _getUser: GetUser;
    private readonly _getModules: GetModules;

    constructor(env: Environment) {
        super();
        this._getUser = new GetUser(env);
        this._getModules = new GetModules(env);
    }

    protected async receive(msg: Record): Promise<Record> {
        return Promise.all([this._getUser.send(msg.username), this._getModules.send(msg.username)])
            .then(([user, modules]) => this.bindModules(user, modules))
            .then(([user, modules]) => new Record(msg.username, user, modules));
    }

    private bindModules(user: User, modules: Array<Module>): [User, Array<BoundModule>] {
        let boundModules = modules.map(m => new BoundModule(user, m));
        return [user, boundModules];
    }

}
