import {User} from "./User";
import {BoundModule} from "./BoundModule";
import {Dictionary, fromPairs} from "lodash";
import {Optional} from "../utils/Optional";

export class Record {
    private readonly _username: Optional<string>;
    private _user: Optional<User>;
    private _modules: Optional<Array<BoundModule>>;
    private _email: Optional<string>;
    private _modulesById: Optional<Dictionary<BoundModule>>;

    constructor(username: string,
                user?: User,
                modules?: Array<BoundModule>,
                email?: string) {
        this._username = Optional.of(username);
        this._user = Optional.ofNullable(user);
        this._modules = Optional.ofNullable(modules);
        this._email = Optional.ofNullable(email);
        this._modulesById = this._modules.map(this.setModulesById);
    }

    get username(): string {
        return this._username.get();
    }

    get user(): User {
        return this._user.get();
    }

    set user(u: User) {
        this._user = Optional.of(u);
    }

    get modules(): Array<BoundModule> {
        return this._modules.get();
    }

    set modules(m: Array<BoundModule>) {
        this._modules = Optional.of(m);
        this._modulesById = this._modules.map(this.setModulesById);
    }

    get email(): string {
        return this._email.get();
    }

    set email(e: string) {
        this._email = Optional.of(e);
    }

    getModule(id: string): BoundModule {
        if (this._modulesById.isPresent() &&
                this._modulesById.get().hasOwnProperty(id)) {
            return this._modulesById.get()[id];
        } else {
            throw new Error('NullPointer');
        }
    }

    private setModulesById(modules: Array<BoundModule>): Dictionary<BoundModule> {
        const pairs = modules.map(m => [m.module.id, m]);
        return fromPairs(pairs);
    }

}