import {User} from "./User";
import {Module} from "./Module";
import {ActiveModule} from "./ActiveModule";
import {ModuleEntry} from "./ModuleEntry";
import {Optional} from "../utils/Optional";

export class BoundModule {
    private _user: Optional<User>;
    private _module: Optional<Module>;
    private _activeModule: Optional<ActiveModule>;
    private _moduleEntry: Optional<ModuleEntry>;
    private _email: Optional<string>;

    constructor(user?: User,
                module?: Module,
                activeModule?: ActiveModule,
                moduleEntry?: ModuleEntry,
                email?: string) {
        this._user = Optional.ofNullable(user);
        this._module = Optional.ofNullable(module);
        this._activeModule = Optional.ofNullable(activeModule);
        this._moduleEntry = Optional.ofNullable(moduleEntry);
        this._email = Optional.ofNullable(email);
    }

    get user(): User {
        return this._user.get();
    }

    set user(u: User) {
        this._user = Optional.of(u);
    }

    get module(): Module {
        return this._module.get();
    }

    set module(m: Module) {
        this._module = Optional.of(m);
    }

    get activeModule(): ActiveModule {
        return this._activeModule.get();
    }

    set activeModule(am: ActiveModule) {
        this._activeModule = Optional.of(am);
    }

    get moduleEntry(): ModuleEntry {
        return this._moduleEntry.get();
    }

    set moduleEntry(me: ModuleEntry) {
        this._moduleEntry = Optional.of(me);
    }

    get email(): string {
        return this._email.get();
    }

    set email(e: string) {
        this._email = Optional.of(e);
    }
}
