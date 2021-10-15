import * as sinon from 'sinon';
import {expect} from 'chai';
import { Process } from '../../../src/engine/processes/Process';
import { ModuleProcessor } from '../../../src/engine/processes/ModuleProcessor';
import { User } from '../../../src/models/User';
import { BoundModule } from '../../../src/models/BoundModule';
import { Module } from '../../../src/models/Module';
import {cloneDeep} from 'lodash';

const MODULES = require('../../../../../test-data/modules.json');
const USERS = require('../../../../../test-data/users.json');

const RESULT_STRING = 'was processed';

describe('engine/processes/ModuleProcessor', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    it('selects the right processor', async () => {
        const modules = MODULES['test'];
        const user = new User(USERS['test']);

        const boundModules = modules.map((m) => new BoundModule(user, new Module(m)));
        const input = boundModules[0];
        const expected = cloneDeep(input);
        expected.email = RESULT_STRING;

        const process = sinon.createStubInstance(Process);
        process.send.returns(expected);

        const processor = new ModuleProcessor({'entries': process});

        const result = await processor.send(input);

        expect(result.email).to.eql(RESULT_STRING);
    });
});