import * as sinon from 'sinon';
import {expect} from 'chai';

import {BoundModule} from "../../../src/models/BoundModule";
import {Record} from "../../../src/models/Record";
import {ActiveModuleFilter} from "../../../src/engine/processes/ActiveModuleFilter";
import {User} from "../../../src/models/User";

const MODULES = require('../../../../../test-data/modules.json');
const USERS = require('../../../../../test-data/users.json');

describe('engine/processes/ActiveModuleFilter', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('filters modules for a user\'s active modules', async () => {
        const filter = new ActiveModuleFilter();

        const modules = MODULES['test'];
        const user = new User(USERS['test']);

        const boundModules = modules.map((m) => new BoundModule(user, m));

        const record = new Record('test', user, boundModules);
        const result = await filter.send(record);

        const activeModuleNames = user.activeModules.map((am) => am.name);
        const containsAll = result.modules.map((bm) => bm.activeModule.name)
            .every((name) => activeModuleNames.includes(name));
        expect(containsAll).to.be.true;
    });
});